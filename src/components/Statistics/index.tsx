import React from "react";

import "./styles.scss";

type Props = {
    time: number;
    isWin: boolean;
}

const Statistics: React.FC<Props> = ({ time, isWin }) => {
    return (
        <section className="statistics">
            <h4 className={["statistics__title", `statistics__title--${isWin ? "win" : "lose"}`].join(' ')}>{isWin ? "Победа!" : "Поражение"}</h4>
            <ul className="statistics__list">
                <li className="statistics__item">Время игры: {time} секунд</li>
            </ul>
        </section>
    );
};

export default Statistics;
