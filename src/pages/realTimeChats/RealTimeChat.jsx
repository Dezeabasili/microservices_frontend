import Chats from "../../components/chats/Chats";
import Messages from "../../components/messages/Messages";
import OnlineFriends from "../../components/onlineFriends/OnlineFriends";
import SearchForFriends from "../../components/searchForFriends/SearchForFriends";
import "./realTimeChat.css";
import { ChatContextProvider } from "../../context/chatContext";
import useWindowSize from "../../hooks/useWindowSize";

const RealTimeChat = () => {
  const screenSize = useWindowSize();

  return (
    <div className="realTimeChat">
      <ChatContextProvider>
        {screenSize.width > 850 && <SearchForFriends />}
        {screenSize.width > 540 && <Chats />}
        <Messages />
        {screenSize.width > 700 && <OnlineFriends />}
      </ChatContextProvider>
    </div>
  );
};

export default RealTimeChat;
