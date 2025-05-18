import { createContext, useContext, useState, useRef } from "react";

const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatContextProvider = ({ children }) => {
 
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState("");
  const [chat_id, setChat_id] = useState("");
  const [users, setUsers] = useState([])
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([])
  const [onlineUsersToDisplay, setOnlineUsersToDisplay] = useState([])
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [isOpenChatMenuModal, setIsOpenChatMenuModal] = useState(false);
  const [isOpenChatMenu, setIsOpenChatMenu] = useState(true);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [isOpenOnlineUsers, setIsOpenOnlineUsers] = useState(false);
  const [isOpenSearchFriends, setIsOpenSearchFriends] = useState(false);

  const previousChat_id = useRef("");

  const handleOpenChatMenu = () => {
    setIsOpenChatMenuModal(true)
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        chatName, 
        setChatName,
        chat_id, 
        setChat_id,
        users, 
        setUsers,
        onlineUsers, 
        setOnlineUsers,
        searchResult, 
        setSearchResult,
        notifications, 
        setNotifications,
        loading, 
        setLoading,
        previousChat_id, 
        usersToDisplay, 
        setUsersToDisplay,
        onlineUsersToDisplay, 
        setOnlineUsersToDisplay,
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
