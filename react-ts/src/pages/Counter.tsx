import {useState} from "react";
import {Buttons, CountViewer} from "../components";

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => {
        if (count !== 99) return setCount(prevState => prevState + 1);
        alert("You can't increment more than 99");
    };
    const decrement = () => {
        if (count !== 0) return setCount(prevState => prevState - 1);
        alert("You can't decrement less than 0");
    };

    return (
        <div style={{
            border: "1px solid black",
            padding: "10px",
        }}>
            <h3>Counter Page</h3>
            <CountViewer count={count}/>
            <Buttons increment={increment} decrement={decrement} count={count}/>
        </div>
    );
}

export default Counter;
