import React from "react";

function Buttons({
                     increment,
                     decrement,
                     count
                 }: React.PropsWithChildren<{ increment: () => void, decrement: () => void, count: number }>) {
    const buttonStyle = {
        width: "10%",
        height: "50px",
        fontSize: "20px",
        margin: "10px"
    }
    return (
        <div>
            <button style={buttonStyle} onClick={() => increment()}>Increment {count} + 1</button>
            <button style={buttonStyle} onClick={() => decrement()}>Decrement {count} - 1</button>
        </div>
    );
}

export default Buttons;