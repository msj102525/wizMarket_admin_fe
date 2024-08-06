import React, { useState } from 'react';

function Main() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!!
            </h1>
            <p>You clicked {count} times</p>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
}

export default Main;
