import React, { useEffect } from "react";
import { GAME_DIFFICULTIES_VALUES } from "../../constants/gameDifficulties";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import { useGameContext } from "../../context/gameContext";
import Board from "../../models/Board";
import BoardComponent from "../BoardComponent";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Corner from "../BorderContainer/Corner";
import Button from "../Button";
import InfoPanel from "../InfoPanel";
import Statistics from "../Statistics";

import "./styles.scss";

const Game: React.FC = () => {
    const { isGameFinished, setSmileStatus, gameManager, difficulty, setBoard, setDifficulty, restartGame } =
        useGameContext();

    useEffect(() => {
        if (isGameFinished) {
            setSmileStatus(gameManager.isWin ? SMILE_STATUSES.WIN : SMILE_STATUSES.LOSE);
        } else {
            setSmileStatus(SMILE_STATUSES.UNPRESSED);
        }
    }, [isGameFinished, setSmileStatus, gameManager.isWin]);

    useEffect(() => {
        if (difficulty) {
            const newBoard = new Board(
                GAME_DIFFICULTIES_VALUES[difficulty].boardSize,
                GAME_DIFFICULTIES_VALUES[difficulty].minesCount
            );
            newBoard.init();
            setBoard(newBoard);
        }
        // eslint-disable-next-line
    }, [difficulty, setBoard]);

    const handleGoBack = () => {
        setDifficulty(null);
        restartGame();
    };

    return (
        <>
            {difficulty && (
                <div className="game">
                    <Button className="game__button" type="notion" onClick={handleGoBack}>
                        В главное меню
                    </Button>
                    <div className="game__body">
                        <Statistics />
                        <div className="game__board">
                            <BorderWrapper>
                                <Corner position="top-left" />
                                <Border direction="horizontal" />
                                <Corner position="top-right" />
                            </BorderWrapper>

                            <InfoPanel />

                            <BorderWrapper>
                                <Corner position="middle-left" />
                                <Border direction="horizontal" />
                                <Corner position="middle-right" />
                            </BorderWrapper>

                            <BoardComponent />

                            <BorderWrapper>
                                <Corner position="bottom-left" />
                                <Border direction="horizontal" />
                                <Corner position="bottom-right" />
                            </BorderWrapper>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Game;
