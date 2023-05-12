import React from "react";
import "./Landing.modules.css"
import { useNavigate } from "react-router-dom";

export default function Landing () {
    const navigate = useNavigate()

    return <div>
        hola landing
        <button onClick={()=>navigate("/shop")}>A shop</button>
    </div>
}