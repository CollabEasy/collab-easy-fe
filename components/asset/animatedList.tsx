import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { routeToHref } from 'config/routes';
import { useRoutesContext } from '../routeContext';
import { getRandomColor } from 'helpers/inspirationHubHelper';

const AnimatedList = ({ list }) => {
    const [currentItem, setCurrentItem] = useState(0);
    const [colors, setColors] = useState([]);

    const {
        toGetInspired,
    } = useRoutesContext();

    useEffect(() => {
        setColors(list.map(() => getRandomColor()));
        const interval = setInterval(() => {
            setCurrentItem((prevItem) => (prevItem + 1) % list.length);
        }, 1000); // Change the interval as needed (in milliseconds)

        return () => clearInterval(interval);
    }, [list]);

    return (
        <div className="circular-list-container">
            <div className="circular-list">
                {list.map((item, index) => (
                    <Link key={index} href={routeToHref(toGetInspired("all"))}>
                        <div className="circular-list-item">
                            <article style={{ backgroundColor: colors[index], borderRadius: '10px' }}>
                                <h5 className="common-h5-style">{item.title}</h5>
                                <p className="common-p-style truncate-line-clamp">{item.description}</p>
                            </article>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AnimatedList;
