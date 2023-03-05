import React from "react";
import { GAME_DIFFICULTIES } from "../../../constants/gameDifficulties";

import "./styles.scss";

type Props = {
    title: string;
    minesCount: number;
    boardSize: number;
    difficulty: GAME_DIFFICULTIES;
    onClick: () => void;
};

const DifficultyCard: React.FC<Props> = ({ title, minesCount, boardSize, onClick, difficulty }) => {
    return (
        <article className={["difficulty-card", `difficulty-card--${difficulty}`].join(" ")} onClick={onClick}>
            <header className="difficulty-card__header">
                <h5 className="difficulty-card__title">{title}</h5>
            </header>
            <ul className="difficulty-card__options-list">
                <li className="difficulty-card__option">
                    Размер поля: {boardSize}x{boardSize}
                </li>
                <li className="difficulty-card__option">Количество мин: {minesCount}</li>
            </ul>
        </article>
    );
};

export default DifficultyCard;
