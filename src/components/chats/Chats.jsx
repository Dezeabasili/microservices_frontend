import "./chats.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
import { useAuthContext } from "../../context/authContext";
import { useChatContext } from "../../context/chatContext";
// //;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useWindowSize from "../../hooks/useWindowSize";

const Chats = () => {
  const screenSize = useWindowSize();
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosWithInterceptors = useAxiosInterceptors();
  const { auth } = useAuthContext();

  const {
    setMessages,
    setChatName,
    setChat_id,
    previousChat_id,
    loading,
    setLoading,
    setUsers,
    setSearchResult,
    setNotifications,
    setIsOpenChatMenuModal,
    handleOpenChatMenu,
    setIsOpenChatMenu,
    setIsOpenChat,
    setIsOpenOnlineUsers,
    setIsOpenSearchFriends,
  } = useChatContext();

  useEffect(() => {
    const getAllChats = async () => {
      try {
        setLoading(true);
        const res1 = await axiosWithInterceptors.get(
          "https://meridianhosts.onrender.com/api/v1/chats"
        );
        // console.log("chats: ", res1.data);
        setChats(res1.data);

        const res2 = await axiosWithInterceptors.get("/api/v1/auth/allusers");
        // console.log("users: ", res2.data);
        let usersExcludingMyself = res2.data.data.filter(
          (user) => user._id !== auth.user_id
        );

        setUsers(res2.data.data);
        // setSearchResult(res2.data.data)
        setSearchResult(usersExcludingMyself);

        setLoading(false);
      } catch (err) {
        if (err.response.data.message) {
          navigate("/handleerror", {
            state: {
              message: err.response.data.message,
              path: location.pathname,
            },
          });
        } else {
          navigate("/somethingwentwrong");
        }
      }
    };

    getAllChats();
  }, []);

  const retrieveName = (eachChat) => {
    // if group chat, return chat name
    if (eachChat.groupChat) return eachChat.chatName;

    // else return name of chat partner
    let chatPartner;
    eachChat.members.forEach((member) => {
      if (member._id != auth.user_id) {
        chatPartner = member.name;
      }
    });
    return chatPartner;
  };

  const downloadMessages = async (chat) => {
    try {
      setIsOpenSearchFriends(false);
      setIsOpenOnlineUsers(false);
      setIsOpenChat(false);
      setIsOpenChatMenuModal(false);
      setIsOpenChatMenu(true);
      const res = await axiosWithInterceptors.get(
        `https://meridianhosts.onrender.com/api/v1/messages/${chat._id}`
      );
      // console.log(res.data)
      setMessages(res.data);
      setChatName(retrieveName(chat));
      setChat_id((prev) => {
        previousChat_id.current = prev;
        return chat._id;
      });

      setNotifications((prev) => {
        return prev.filter((notif) => notif.chat_id !== chat._id);
      });
    } catch (err) {
      if (err.response.data.message) {
        navigate("/handleerror", {
          state: {
            message: err.response.data.message,
            path: location.pathname,
          },
        });
      } else {
        navigate("/somethingwentwrong");
      }
    }
  };

  return (
    <div className="chats">
      {loading ? (
        // <RotatingLines
        //   visible={true}
        //   height="96"
        //   width="96"
        //   color="grey"
        //   strokeWidth="5"
        //   animationDuration="0.75"
        //   ariaLabel="rotating-lines-loading"
        //   wrapperStyle={{}}
        //   wrapperClass=""
        // />
        <h1>Loading</h1>
      ) : (
        <>
          {/* <h4>Chats</h4> */}
          <div className="chatArrow">
            {screenSize.width < 850 && (
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="headerSearchIcon headerSearchIcon2 chatArrowPointer"
                onClick={handleOpenChatMenu}
              />
            )}
            <h4>Chats</h4>
          </div>
          <br />
          {chats.length > 0 ? (
            <>
              {chats?.map((chat) => (
                <div key={chat._id}>
                  <p
                    onClick={() => downloadMessages(chat)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {retrieveName(chat)}
                  </p>
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No chat to display !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default Chats;
