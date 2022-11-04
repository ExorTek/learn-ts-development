import {HelloWorld, ThisIsMyTsProject} from '../components';

function Hello() {
    return (
        <div style={{
            border: "1px solid black",
            padding: "10px",
        }}>
            <h3>Hello World Page</h3>
            <HelloWorld/>
            <ThisIsMyTsProject/>
        </div>
    );
}

export default Hello;