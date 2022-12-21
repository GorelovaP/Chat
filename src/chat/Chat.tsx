import React, {useEffect, useState} from "react";
import "./chat.scss"
import {Message} from "../message/Message";
import {io} from "socket.io-client";
import {HiArrowNarrowLeft, HiUserGroup} from "react-icons/hi";
import {IoSendSharp} from "react-icons/io5";


const socket = io("http://localhost:3009");

export const Chat = () => {

    const [messages, setMessages] = useState<any[]>([])
    const [message, setMessage] = useState<string>("")


    useEffect(() => {
        socket.on("init-messages-publish", (messages: any) => {
            setMessages(messages)
        })


    }, [])
    useEffect(() => {
        socket.on("new-message-sent", (message: any) => {
            setMessages((messages) => {
                console.log(messages)
                return [...messages, message]
            })

        })
    }, [])

    return (
        <div className="chatArea">
            <div className="chatArea__header">
                <div className="chatArea__header__small"> </div>
                <div className="chatArea__header__big">
                    <HiArrowNarrowLeft style={{fontSize: '25px'}}/>
                    <p className="chatArea__header__big__header"> General Chat</p>
                    <HiUserGroup style={{fontSize: '25px', paddingRight: "10px"}}/>
                </div>
            </div>
            <div className="messageArea">
                {messages.map((el, index) => <Message key={index} message={el.message} user={el.user}/>)}
            </div>


            <div className="enterArea">
                <textarea className="enterArea__textArea" value={message} onChange={e => setMessage(e.currentTarget.value)}/>
                <button className="enterArea__button" onClick={() => {
                    socket.emit("client-message-sent", message)
                    setMessage("")
                }}>
                    <IoSendSharp size='25px'/>
                </button>
            </div>
        </div>)
}