import {HelloWorld, ThisIsMyTsSolidProj} from "../components";

function Hello() {
    return (
        <div style={{
            padding: "1rem",
            border: "1px solid black",
        }}>
            <h3>Hello World Page</h3>
            <HelloWorld/>
            <ThisIsMyTsSolidProj/>
        </div>
    );
}

export default Hello;