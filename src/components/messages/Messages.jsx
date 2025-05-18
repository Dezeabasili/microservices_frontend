import "./messages.css";
import Chats from "../chats/Chats";
import OnlineFriends from "../onlineFriends/OnlineFriends";
import SearchForFriends from "../searchForFriends/SearchForFriends";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { io } from "socket.io-client";
import { useChatContext } from "../../context/chatContext";
import { useAuthContext } from "../../context/authContext";
import useAxiosInterceptors from "../../hooks/useAxiosWithInterceptors";
// import ScrollableFeed from "react-scrollable-feed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faArrowLeft,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import useWindowSize from "../../hooks/useWindowSize";

const Messages = () => {
  const screenSize = useWindowSize();
  const [newMessage, setNewMessage] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const socket = useRef();

  const axiosWithInterceptors = useAxiosInterceptors();

  const {
    messages,
    setMessages,
    chatName,
    chat_id,
    previousChat_id,
    setOnlineUsers,
    notifications,
    setNotifications,
    setChatName,
    setChat_id,
    isOpenChatMenuModal,
    setIsOpenChatMenuModal,
    handleOpenChatMenu,
    isOpenChatMenu,
    setIsOpenChatMenu,
    isOpenChat,
    setIsOpenChat,
    isOpenOnlineUsers,
    setIsOpenOnlineUsers,
    isOpenSearchFriends,
    setIsOpenSearchFriends,
  } = useChatContext();

  const { auth } = useAuthContext();

  useEffect(() => {
    if (socket.current == null) {
      // socket.current = io("https://meridianhosts.onrender.com");
      socket.current = io("https://meridianhosts.onrender.com");
      socket.current.emit("Update online users", auth.user_id);
    }

    // return () => {
    //   return socket.current.close();
    // };
  }, []);

  useEffect(() => {
    let roomObj = {};
    roomObj.newRoom = chat_id;
    roomObj.oldRoom = previousChat_id.current;
    socket.current.emit("join chat room", roomObj);
  }, [chat_id]);

  useEffect(() => {
    socket.current.on("received message", (newMessage) => {
      console.log("chat_id: ", chat_id);
      console.log("newMessage.chatInfo._id: ", newMessage.chatInfo._id);

      if (!chat_id || (chat_id && newMessage.chatInfo._id !== chat_id)) {
        let messObj = {};
        let filteredNotification;

        messObj.chat_id = newMessage.chatInfo._id;

        if (newMessage.chatInfo.groupChat) {
          messObj.name = newMessage.chatInfo.chatName;
        } else {
          messObj.name = newMessage.sentBy.name;
        }

        setNotifications((prev) => {
          filteredNotification = prev.filter(
            (notif) => notif.chat_id !== messObj.chat_id
          );
          return [messObj, ...filteredNotification];
        });

        setIsNotificationOpen(false);
      } else {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => {
      socket.current.off("received message");
    };
  }, [chat_id]);

  useEffect(() => {
    socket.current.on("send online users", (updatedOnlineUsers) => {
      let onlineUsersExcludingMe = updatedOnlineUsers.filter(
        (user) => user.user_id !== auth.user_id
      );

      setOnlineUsers(onlineUsersExcludingMe);
    });

    return () => {
      socket.current.off("send online users");
    };
  }, [chat_id]);

  const downloadMessages = async (notification) => {
    try {
      const res = await axiosWithInterceptors.get(
        `https://meridianhosts.onrender.com/api/v1/messages/${notification.chat_id}`
      );
      // console.log(res.data)
      setMessages(res.data);
      setChatName(notification.name);
      setChat_id((prev) => {
        previousChat_id.current = prev;
        return notification.chat_id;
      });

      setNotifications((prev) => {
        return prev.filter((notif) => notif.chat_id !== notification.chat_id);
      });

      setIsNotificationOpen(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let chatMessage = {};
    chatMessage.messageContent = newMessage;
    chatMessage.chatInfo = chat_id;

    try {
      const res = await axiosWithInterceptors.post(
        "https://meridianhosts.onrender.com/api/v1/messages",
        {
          messageContent: newMessage,
          chatInfo: chat_id,
        }
      );
      // console.log("message: ", res.data);
      setMessages((prev) => [...prev, res.data]);

      socket.current.emit("new message", res.data);
      setNewMessage("");
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

  const openMenuItem = (menuItemName) => {
    setIsOpenChatMenu(false);
    if (menuItemName === "chats") {
      setIsOpenChat(true);
    } else if (menuItemName === "Users Online") {
      setIsOpenOnlineUsers(true);
    } else if (menuItemName === "Search for a user") {
      setIsOpenSearchFriends(true);
    }
  };

  const toggleNotification = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  const closeAllChatModals = () => {
    setIsOpenSearchFriends(false);
    setIsOpenOnlineUsers(false);
    setIsOpenChat(false);
    setIsOpenChatMenuModal(false);
    setIsOpenChatMenu(true);
  };

  return (
    <div className="messages">
      {chatName ? (
        <>
          <div className="nameAndNotification">
            <div className="chatArrow">
              {screenSize.width < 540 && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="headerSearchIcon headerSearchIcon2 chatArrowPointer"
                  onClick={handleOpenChatMenu}
                />
              )}
              <h4>{chatName}</h4>
            </div>

            <div onClick={toggleNotification} className="notification">
              <div className="notificationCount">
                <FontAwesomeIcon
                  icon={faBell}
                  className="headerSearchIcon headerSearchIcon2"
                />
                {notifications.length > 0 && (
                  <span>{notifications.length}</span>
                )}
              </div>
              {isNotificationOpen && (
                <div className="notificationChats">
                  {notifications.map((notification) => (
                    <p
                      onClick={() => downloadMessages(notification)}
                      key={notification.chat_id}
                    >
                      {notification.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="don1">
            {/* <ScrollableFeed>
              {messages.length > 0 ? (
                <div className="messageContainer">
                  {messages?.map((message) => (
                    <div
                      className={
                        message.sentBy._id === auth.user_id
                          ? "myMessage"
                          : "otherMessages"
                      }
                      key={message._id}
                    >
                      <p>{message.messageContent}</p>
                      <p className="messageTime">
                        {format(
                          new Date(message.createdAt),
                          "MMM/dd/yyyy,  hh:mm bbb"
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p></p>
              )}
            </ScrollableFeed> */}
          </div>

          <form className="newMessageForm">
            <input
              className="newMessageInput"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />

            <button onClick={handleSubmit} className="newMessageButton">
              Send
            </button>
          </form>
        </>
      ) : (
        <div>
          <div className="nameAndNotification">
            <div className="chatArrow">
              {screenSize.width < 540 && (
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="headerSearchIcon headerSearchIcon2 chatArrowPointer"
                  onClick={handleOpenChatMenu}
                />
              )}
              <h4>Chat name</h4>
            </div>
            <div onClick={toggleNotification} className="notification">
              <div className="notificationCount">
                <FontAwesomeIcon
                  icon={faBell}
                  className="headerSearchIcon headerSearchIcon2"
                />
                {notifications.length > 0 && (
                  <span>{notifications.length}</span>
                )}
              </div>
              {isNotificationOpen && (
                <div className="notificationChats">
                  {notifications.map((notification) => (
                    <p
                      onClick={() => downloadMessages(notification)}
                      key={notification.chat_id}
                    >
                      {notification.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <br />
          <p>Select a chat to display messages !!!</p>
        </div>
      )}

      {isOpenChatMenuModal && screenSize.width < 850 && (
        <div className="openChatMenu">
          {isOpenChatMenu && screenSize.width < 850 && (
            <div className="modalSubContainer">
              {screenSize.width < 540 && (
                <div>
                  <span
                    className="chatMenuItem"
                    onClick={() => openMenuItem("chats")}
                  >
                    Chats
                  </span>
                </div>
              )}
              <br />
              {screenSize.width < 700 && (
                <div>
                  <span
                    className="chatMenuItem"
                    onClick={() => openMenuItem("Users Online")}
                  >
                    Users Online
                  </span>
                </div>
              )}
              <br />
              {screenSize.width < 850 && (
                <div>
                  <span
                    className="chatMenuItem"
                    onClick={() => openMenuItem("Search for a user")}
                  >
                    Search for a user
                  </span>
                </div>
              )}

              <FontAwesomeIcon
                icon={faCircleXmark}
                className="headerSearchIcon headerSearchIcon2 cancelModalSubContainer"
                onClick={closeAllChatModals}
              />
            </div>
          )}
          {isOpenChat && (
            <div className="modalSubContainer">
              <Chats />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="headerSearchIcon headerSearchIcon2 cancelModalSubContainer"
                onClick={closeAllChatModals}
              />
            </div>
          )}
          {isOpenOnlineUsers && (
            <div className="modalSubContainer">
              <OnlineFriends />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="headerSearchIcon headerSearchIcon2 cancelModalSubContainer"
                onClick={closeAllChatModals}
              />
            </div>
          )}
          {isOpenSearchFriends && (
            <div className="modalSubContainer">
              <SearchForFriends />
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="headerSearchIcon headerSearchIcon2 cancelModalSubContainer"
                onClick={closeAllChatModals}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
