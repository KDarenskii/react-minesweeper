import React from "react";
import { GAME_DIFFICULTIES } from "../../constants/gameDifficulties";
import { useGameContext } from "../../context/gameContext";
import DifficultyCard from "./DifficultyCard";

import "./styles.scss";

const Difficulty: React.FC = () => {
    const { difficulty, setDifficulty } = useGameContext();

    return (
        <>
            {!difficulty && (
                <section className="difficulty">
                    <h3 className="difficulty__title">Выбор сложности:</h3>
                    <ul className="difficulty__list">
                        <DifficultyCard
                            title="Легкая"
                            minesCount={8}
                            boardSize={10}
                            onClick={() => setDifficulty(GAME_DIFFICULTIES.EASY)}
                            difficulty={GAME_DIFFICULTIES.EASY}
                        />
                        <DifficultyCard
                            title="Нормальная"
                            minesCount={40}
                            boardSize={16}
                            onClick={() => setDifficulty(GAME_DIFFICULTIES.NORMAL)}
                            difficulty={GAME_DIFFICULTIES.NORMAL}
                        />
                        <DifficultyCard
                            title="Сложная"
                            minesCount={50}
                            boardSize={20}
                            onClick={() => setDifficulty(GAME_DIFFICULTIES.HARD)}
                            difficulty={GAME_DIFFICULTIES.HARD}
                        />
                    </ul>
                </section>
            )}
        </>
    );
};

export default Difficulty;
