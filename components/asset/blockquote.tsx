import React from 'react';

const Blockquote = ({
    quotes,
}) => {
    return (
        <div className="blockquote_container ">
            <div className="typewriter">
                <h1>{quotes}</h1>
            </div>
        </div>
    );
};

export default Blockquote;
