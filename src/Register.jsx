import { useState } from "react"
import { useContext } from "react";
import { GlobalContext } from "./GlobalContext"

export default function Register(props) {

  const global = useContext(GlobalContext);

  const [callsign, setCallsign] = useState("");

  function register() {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: callsign,
        faction: "COSMIC",
      }),
    };

    fetch("https://api.spacetraders.io/v2/register", options)
      .then((response) => response.json())
      .then((response) => {
        if(global.setData(response)) global.setAuthToken(response.token);
      })
      .catch((error) => updateCurrentMessage(error));
  }

  return (
    <>
      <label htmlFor="callsign">Callsign: </label>
      <input type="text" id="callsign" value={callsign} onChange={(e)=>{setCallsign(e.target.value)}} />
      <button onClick={()=>{register()}}>Register</button>
    </>
  )

}