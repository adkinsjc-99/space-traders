import { createContext } from "react"
import { useState } from "react"

const GlobalContext = createContext();

function GlobalProvider(props) {

  const [authToken, setAuthToken] = useState("");
  const [message, setMessage] = useState("")
  const [data, setData] = useState({});

  function updateMessage(content) {
    console.log(content);
    setMessage(content);
  }

  function updateData(res) {
    if(res.error) setMessage(res.error.message)
    else setData(res);
    return !res.error
  }

  function updateAuthToken(token) {
    localStorage.setItem("auth_token", token);
    setAuthToken(token);
  }

  const obj = {
    theme: 'dark',
    authToken: authToken,
    setAuthToken: updateAuthToken,
    message: message,
    setMessage: updateMessage,
    data: data,
    setData: updateData
  }

  return (
    <GlobalContext.Provider value={obj}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };