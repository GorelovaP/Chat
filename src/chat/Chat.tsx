import React, {useEffect, useState} from "react";
import "./chat.scss"
import {Message} from "../message/Message";
import {HiArrowNarrowLeft, HiUserGroup} from "react-icons/hi";
import {socket} from "../api/api";
import {EnterName} from "../enterArea/enterName/EnterName";
import {EnterMessage} from "../enterArea/enterMessage/EnterMessage";


export const Chat = () => {

    const [messages, setMessages] = useState<any[]>([])
    const [isName, setName] = useState("")

    console.log(messages)

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
                {isName ?
                    messages.map((el, index) => <Message key={index}
                                                         message={el.message}
                                                         user={el.user}/>)
                    : <div className="messageArea__warning">Enter your name!!</div>}
            </div>
            <div className="enterArea">
                {isName ? <EnterMessage/> : <EnterName setName={setName} name={isName}/>}
            </div>
        </div>)
}