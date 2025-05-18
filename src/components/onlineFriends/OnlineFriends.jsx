import "./onlineFriends.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";

const OnlineFriends = () => {
  const [onlineUsersToDisplay, setOnlineUsersToDisplay] = useState([]);
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
    users,
    onlineUsers,
    setNotifications,
    setIsOpenChatMenuModal,
    setIsOpenChatMenu,
    setIsOpenChat,
    setIsOpenOnlineUsers,
    setIsOpenSearchFriends,
  } = useChatContext();

  useEffect(() => {
    const getUserNames = () => {
      let friends = [];
      onlineUsers?.forEach((eachOnlineUser) => {
        let found = users?.find((user) => user._id == eachOnlineUser.user_id);
        if (found) friends.push(found);
      });
      setOnlineUsersToDisplay((prev) => friends);
    };
    getUserNames();
  }, [onlineUsers, loading]);

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
      // console.log(res2.data);
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
    <div className="onlineFriends">
      <h4>Users online</h4>
      <br />
      {onlineUsersToDisplay.length > 0 ? (
        <>
          {onlineUsersToDisplay?.map((user) => (
            <div className="onlinediv" key={user?._id}>
              <div className="onlinedivColor"> </div>
              <div onClick={() => fetchOrCreateChat(user._id)}>
                {user?.name}
              </div>
              <br />
            </div>
          ))}
        </>
      ) : (
        <h5>Sorry, no one is online at the moment</h5>
      )}
    </div>
  );
};

export default OnlineFriends;
