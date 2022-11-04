import React from "react";
import {Hello, Counter} from "../pages";

function Main() {
    return (
        <div style={{
            border: "1px solid black",
            padding: "50px",
        }}>
            <h3>Main Layout</h3>
            <Hello/>
            <Counter/>
        </div>
    );
}

export default Main;