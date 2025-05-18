import axios from "axios";
import { useAuthContext } from "../context/authContext";
import { useEffect } from "react";
// import { baseURL } from "../context/authContext";

const axiosWithInterceptors = axios.create({ withCredentials: true });
const axios2 = axios.create({ withCredentials: true });

const useAxiosInterceptors = () => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = axiosWithInterceptors.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        if (!config.headers.authorization) {
          config.headers.authorization = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor
    const responseInterceptor = axiosWithInterceptors.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // invalid access token will send back response status code 403
        let req = error.config;
        if (error.response.status === 403 && !req.firstTime) {
          req.firstTime = true;
          console.log(
            "This is inside the Response Interceptor and above the request for new access token"
          );
          // request new access token
          const response = await axios2.get("/api/v1/auth/renew_access_token");
          const newAccessToken = response.data.accessToken;
          console.log(
            "This is inside the Response Interceptor and above the setAuth"
          );
          // update auth with new access token
          setAuth((prevAuth) => {
            return {
              ...prevAuth,
              accessToken: newAccessToken,
            };
          });

          // update the request object with the new access token
          req.headers.authorization = `Bearer ${newAccessToken}`;

          // resend the request with the new access token
          const res = await axiosWithInterceptors(req);
          return res;
        }
        return Promise.reject(error);
      }
    );

    // remove the interceptors
    return () => {
      axiosWithInterceptors.interceptors.request.eject(requestInterceptor);
      axiosWithInterceptors.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, setAuth]);

  return axiosWithInterceptors;
};

export default useAxiosInterceptors;
