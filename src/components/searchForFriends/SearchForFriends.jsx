import "./searchForFriends.css";
import { useNavigate, useLocation } from "react-router";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
//;

const SearchForFriends = () => {
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
    searchResult,
    setSearchResult,
    users,
    setNotifications,
    setIsOpenChatMenuModal,
    setIsOpenChatMenu,
    setIsOpenChat,
    setIsOpenOnlineUsers,
    setIsOpenSearchFriends,
  } = useChatContext();

  const retrieveName = (eachChat) => {
    if (eachChat.groupChat) return eachChat.chatName;

    let chatPartner;
    eachChat.members.forEach((member) => {
      if (member._id != auth.user_id) {
        chatPartner = member.name;
      }
    });
    return chatPartner;
  };

  const handleSearch = (e) => {
    setSearchResult((prev) => {
      if (e.target.value)
        return users.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      return users;
    });
  };

  const fetchOrCreateChat = async (chatPartner_Id) => {
    setIsOpenSearchFriends(false);
    setIsOpenOnlineUsers(false);
    setIsOpenChat(false);
    setIsOpenChatMenuModal(false);
    setIsOpenChatMenu(true);

    try {
      const res1 = await axiosWithInterceptors.post(
        "https://meridianhosts.onrender.com/api/v1/chats",
        {
          chatPartner_Id,
        }
      );

      const res2 = await axiosWithInterceptors.get(
        `https://meridianhosts.onrender.com/api/v1/messages/${res1.data._id}`
      );

      setMessages(res2.data);
      setChatName(retrieveName(res1.data));
      setChat_id((prev) => {
        previousChat_id.current = prev;
        return res1.data._id;
      });

      setNotifications((prev) => {
        return prev.filter((notif) => notif.chat_id !== res1.data._id);
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
    <div className="searchForFriends">
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
          <h4>Search for a user</h4>
          <input type="text" onChange={handleSearch} />
          <br />
          {searchResult.length > 0 ? (
            <>
              {searchResult?.map((user) => (
                <div key={user._id}>
                  <p
                    onClick={() => fetchOrCreateChat(user._id)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {user.name}
                  </p>
                  <br />
                </div>
              ))}
            </>
          ) : (
            <p>No user matches your search !!!</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchForFriends;
