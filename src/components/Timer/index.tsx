import React from "react";
import { splitNumber } from "../../helpers/splitNumber";
import Counter from "../Counter";

import "./styles.scss";

type Props = {
    isGameGoing: boolean;
};

const Timer: React.FC<Props> = ({ isGameGoing }) => {
    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
        if (!isGameGoing) return;
        const interval = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [isGameGoing]);

    return <Counter number={time} />;
};

export default Timer;
