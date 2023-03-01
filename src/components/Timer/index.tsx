import React from "react";
import Counter from "../Counter";

import "./styles.scss";

type Props = {
    isGameGoing: boolean;
    updateTimer: () => void;
};

const Timer: React.FC<Props> = ({ isGameGoing, updateTimer }) => {
    const [time, setTime] = React.useState(0);

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
