import { useState, useContext } from "react"
import { GlobalContext } from "./GlobalContext"

export default function Login(props) {

  const global = useContext(GlobalContext);

  const [token, setToken] = useState("");

  function handleLoginPressed() {
    const options = {
      method: "GET",
      headers: {
        'Content-Type': 'application.json',
        authorization: `Bearer ${token}`
      }
    };

    fetch('https://api.spacetraders.io/v2/my/agent', options)
      .then((response) => response.json())
      .then((response) => {
        if(response) {
          if(global.setData(response)) {
            props.setLoggedIn(true);
            global.setAuthToken(token);
          }
        }
      })
      .catch((error) => global.setMessage(error));
  }

  return (
    <>
      <div id="login">
        <label htmlFor="accessToken">Access Token: </label>
        <input type="text" id="accessToken" value={token} onChange={(e)=>{setToken(e.target.value)}} />
        <button onClick={handleLoginPressed}>Login</button>
      </div>
    </>
  )
}
