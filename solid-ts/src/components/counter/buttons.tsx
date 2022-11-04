function Buttons(props: { increment: () => void, decrement: () => void, count: number }) {
    const buttonStyle = {
        "width": "10%",
        "height": "50px",
        "font-size": "1.0rem",
        "margin": "10px"
    }
    return (
        <div>
            <div>
                <button style={buttonStyle} onClick={() => props.increment()}>Increment {props.count} + 1</button>
                <button style={buttonStyle} onClick={() => props.decrement()}>Decrement {props.count} - 1</button>
            </div>
        </div>
    );
}

export default Buttons;