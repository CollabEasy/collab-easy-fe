import React from 'react';

const StackedCard = ({ list }) => {
    return (
        <div className="stackCardsContainer">
            <ul id="stack-cards">
                <li className="stackCard" id="stack-card1">
                    <div className="stackCardBody">
                        <h2>Card 1</h2>
                    </div>
                </li>
                <li className="stackCard" id="stack-card2">
                    <div className="stackCardBody">
                        <h2>Card 2</h2>
                    </div>
                </li>
                <li className="stackCard" id="stack-card3">
                    <div className="stackCardBody">
                        <h2>Card 3</h2>
                    </div>
                </li>
                <li className="stackCard" id="stack-card4">
                    <div className="stackCardBody">
                        <h2>Card 4</h2>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default StackedCard;
