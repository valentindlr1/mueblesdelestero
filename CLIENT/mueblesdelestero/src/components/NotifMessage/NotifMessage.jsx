import React from "react";
import "./NotifMessage.modules.css"

export default function NotifMessage ({message}) {
    return <div className="notifMessageContainer">
        <h4 className="notifMessage">{message}</h4>
    </div>
}