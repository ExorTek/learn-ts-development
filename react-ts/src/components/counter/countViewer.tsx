import React from "react";

function CountViewer({count}: React.PropsWithChildren<{ count: number }>) {
    return (
        <div>
            <h1>Count: {count}</h1>
        </div>
    );
}

export default CountViewer;