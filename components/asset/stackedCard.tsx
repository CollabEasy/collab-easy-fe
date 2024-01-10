import React from 'react';
import '../../styles/assets/StackedCard.module.scss';

const StackedCard = ({ list }) => {
    return (
        <div className="stack-cards-container">
            <ul id="stack-cards">
                <li className="stack-card" id="stack-card1">
                    <div className="stack-card-body">
                        <h2>Card 1</h2>
                    </div>
                </li>
                <li className="stack-card" id="stack-card2">
                    <div className="stack-card-body">
                        <h2>Card 2</h2>
                    </div>
                </li>
                <li className="stack-card" id="stack-card3">
                    <div className="stack-card-body">
                        <h2>Card 3</h2>
                    </div>
                </li>
                <li className="stack-card" id="stack-card4">
                    <div className="stack-card-body">
                        <h2>Card 4</h2>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default StackedCard;
