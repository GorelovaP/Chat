import React from "react";
import "./message.scss"

type PropsType = {
    user: {
        name: string
    },
    message: string
    key: number
}
export const Message = (props: PropsType) => {
    return (<div className="message">
        <b className="message__name">{props.user.name}</b>: {props.message}
    </div>)
}