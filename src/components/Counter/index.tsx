import React from "react";
import { splitNumber } from "../../helpers/splitNumber";

import "./styles.scss";

type Props = {
    number: number;
};

const Counter: React.FC<Props> = ({ number }) => {
    
    const splittedNumber = splitNumber(number);

    return (
        <div className="counter">
            <div className="counter__number" data-mine-number={splittedNumber[0]}></div>
            <div className="counter__number" data-mine-number={splittedNumber[1]}></div>
            <div className="counter__number" data-mine-number={splittedNumber[2]}></div>
        </div>
    );
};

export default Counter;
