import React from "react";
import { useGameContext } from "../context/gameContext";
import Counter from "./Counter";

const Timer: React.FC = () => {
    const [time, setTime] = React.useState(0);

    const { isGameGoing, updateTimer } = useGameContext();

    React.useEffect(() => {
        if (!isGameGoing) setTime(0);
    }, [isGameGoing]);

    React.useEffect(() => {
        if (!isGameGoing) return;
        const interval = setInterval(() => {
            updateTimer();
            setTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameGoing, time, updateTimer]);

    return <Counter number={time} />;
};

export default Timer;
