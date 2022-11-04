import {Hello, Counter} from "../pages";

function Main() {
    return (
        <div style={{
            padding: "2rem",
            border: "1px solid black",
        }}>
            <h3>Main Layout</h3>
            <Hello/>
            <Counter/>
        </div>
    );
}

export default Main;