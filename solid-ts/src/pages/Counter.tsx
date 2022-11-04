import {createEffect, createSignal} from "solid-js";
import {CountViewer, Buttons} from "../components";

function Counter() {
    const [count, setCount] = createSignal(0);
    const increment = () => {
        if (count() !== 99) return setCount(count() + 1);
        alert("You can't increment more than 99");
    };
    const decrement = () => {
        if (count() !== 0) return setCount(count() - 1);
        alert("You can't decrement less than 0");
    };
    return (
        <div style={{
            padding: "1rem",
            border: "1px solid black",
        }}>
            <h3>Counter Page</h3>
            <CountViewer count={count()}/>
            <Buttons increment={increment} decrement={decrement} count={count()}/>
        </div>
    );
}

export default Counter;