import { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const targetTime = new Date(targetDate).getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            // Target date has passed
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="countdown">
            <div>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
        </div>
    );
};

export default CountdownTimer;
