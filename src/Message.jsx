import { useContext } from "react"
import { GlobalContext } from "./GlobalContext"


export default function Message() {

  const global = useContext(GlobalContext);

  return (
    <>
      <div>{global.message}</div>
    </>
  )
}