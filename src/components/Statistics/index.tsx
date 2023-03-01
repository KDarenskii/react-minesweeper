import React from "react";
import { useGameContext } from "../../context/gameContext";

import "./styles.scss";

const Statistics: React.FC = () => {
    const { time, isWin, isGameFinished } = useGameContext();

    return (
        <>
            {isGameFinished && (
                <section className="statistics">
                    <h4 className={["statistics__title", `statistics__title--${isWin ? "win" : "lose"}`].join(" ")}>
                        {isWin ? "Победа!" : "Поражение"}
                    </h4>
                    <ul className="statistics__list">
                        <li className="statistics__item">Время игры: {time} секунд</li>
                    </ul>
                </section>
            )}
        </>
    );
};

export default Statistics;
