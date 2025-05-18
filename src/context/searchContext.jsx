import { createContext, useContext, useState, useRef } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export const SearchContextProvider = ({ children }) => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [checkinDateValue, setCheckinDateValue] = useState(new Date());
  const [checkoutDateValue, setCheckoutDateValue] = useState(new Date());
  const [destination, setDestination] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatName, setChatName] = useState();
  const [chat_id, setChat_id] = useState();
  const previousChat_id = useRef()

  const validateCheckoutDateValue = (date) => {
    if (checkinDateValue.getTime() > date.getTime()) {
      setCheckoutDateValue(checkinDateValue);
    } else {
      setCheckoutDateValue(date);
    }
  };

  const validateCheckinDateValue = (date) => {
    if (date.getTime() > checkoutDateValue.getTime()) {
      setCheckoutDateValue(date);
      setCheckinDateValue(date);
    } else {
      setCheckinDateValue(date);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        date,
        setDate,
        destination,
        setDestination,
        checkinDateValue,
        setCheckinDateValue,
        checkoutDateValue,
        setCheckoutDateValue,
        validateCheckoutDateValue,
        validateCheckinDateValue,
        messages,
        setMessages,
        chatName, 
        setChatName,
        chat_id, 
        setChat_id,
        previousChat_id,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
