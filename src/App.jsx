import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GlobalProvider } from "./GlobalContext.jsx"
import Login from "./Login.jsx"
import Register from "./Register.jsx"
import Message from "./Message.jsx"

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [data, setData] = useState({});

  function handleAccessTokenChange(event) {
    setAccessToken(event.target.value);
  }

  function getStatus() {
    fetch('https://api.spacetraders.io/v2/')
    .then((response) => response.json())
    .then((data) => updateCurrentMessage(data.status))
    .catch((error) => updateCurrentMessage(error))
  }

  useEffect(() => {
    let token = localStorage.getItem("auth_token");
    setLoggedIn(token);
    // getStatus();
  }, []);

  if(!loggedIn) {
    return (
      <GlobalProvider>
        <Message />
        <h1>Space Traders</h1>
        <div>
          <Login setLoggedIn={setLoggedIn} />
          <p>OR</p>
          <Register />
        </div>
      </GlobalProvider>
    )
  } 
}

export default App
