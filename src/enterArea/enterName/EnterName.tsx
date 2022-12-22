import React, {Dispatch, SetStateAction, useState} from "react";
import {socket} from "../../api/api";
import "../enterArea.scss"
import {IoSendSharp} from "react-icons/io5";

type propsType = {
    setName: Dispatch<SetStateAction<string>>
    name: string

}

export const EnterName = (props: propsType) => {
    const [name, setName] = useState(props.name)
    return <>
        <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}
               className="enterArea__textArea" placeholder="Enter your name"/>
        <button className="enterArea__button"
                onClick={() => {
                    socket.emit("client-name-sent", name)
                    props.setName(name)
                }}

        ><IoSendSharp size='25px'/></button>
    </>
}