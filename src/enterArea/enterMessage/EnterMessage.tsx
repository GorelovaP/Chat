import {socket} from "../../api/api";
import {IoSendSharp} from "react-icons/io5";
import React, {useState} from "react";
import "../enterArea.scss"

export const EnterMessage = () => {
    const [message, setMessage] = useState<string>("")
    return (
        <>
            <textarea className="enterArea__textArea" value={message}
                      onChange={e => setMessage(e.currentTarget.value)}
                      placeholder="enter your message"
            />
            <button className="enterArea__button" onClick={() => {
                socket.emit("client-message-sent", message)
                setMessage("")
            }}>
                <IoSendSharp size='25px'/>
            </button>
        </>
    )
}