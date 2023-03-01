import React, { useState, useEffect, useCallback } from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import GameManager from "../../models/GameManager";
import BoardComponent from "../BoardComponent";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Corner from "../BorderContainer/Corner";
import InfoPanel from "../InfoPanel";
import Statistics from "../Statistics";

import "./styles.scss";

const App: React.FC = () => {
    const [gameManager, setGameManager] = useState(new GameManager());
    const [board, setBoard] = useState(new Board());
    const [isGameGoing, setIsGameGoing] = useState(false);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [smileStatus, setSmileStatus] = useState(SMILE_STATUSES.UNPRESSED);

    const initializeBoard = useCallback((cell?: Cell) => {
        board.initBoard(cell);
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
        // eslint-disable-next-line
    }, []);

    React.useEffect(() => {
        if (isGameFinished) {
            setSmileStatus(gameManager.isWin ? SMILE_STATUSES.WIN : SMILE_STATUSES.LOSE);
        } else {
            setSmileStatus(SMILE_STATUSES.UNPRESSED);
        }
    }, [isGameFinished, setSmileStatus, gameManager.isWin])

    useEffect(() => {
        // const initializedBoard = new Board();
        // initializedBoard.initBoard();
        // setBoard(initializedBoard);
        initializeBoard();
    }, [initializeBoard]);

    const restartGame = () => {
        // board.initBoard(cell);
        // const newBoard = board.getCopyBoard();
        // setBoard(newBoard);
        initializeBoard();

        const newGameManager = new GameManager();
        newGameManager.isPlaying = false;
        setIsGameGoing(false);
        setIsGameFinished(false);
        setGameManager(newGameManager);
        setSmileStatus(SMILE_STATUSES.UNPRESSED);
    };

    return (
        <div className="app">
            <div className="app__wrapper">
                {isGameFinished && <Statistics time={gameManager.time} isWin={gameManager.isWin} />}
                <div className="app__game">
                    <BorderWrapper>
                        <Corner position="top-left" />
                        <Border direction="horizontal" />
                        <Corner position="top-right" />
                    </BorderWrapper>
                    <InfoPanel
                        isGameGoing={isGameGoing}
                        minesLeft={board.countMinesLeft()}
                        updateTimer={() => gameManager.increaseTimer()}
                        smileStatus={smileStatus}
                        setSmileStatus={setSmileStatus}
                        restartGame={restartGame}
                    />
                    <BorderWrapper>
                        <Corner position="middle-left" />
                        <Border direction="horizontal" />
                        <Corner position="middle-right" />
                    </BorderWrapper>
                    <BoardComponent
                        board={board}
                        setBoard={setBoard}
                        restartGame={initializeBoard}
                        setIsGameGoing={setIsGameGoing}
                        isGameFinished={isGameFinished}
                        setIsGameFinished={setIsGameFinished}
                        checkIsGamedEnded={gameManager.checkIsGamedEnded.bind(gameManager)}
                        setSmileStatus={setSmileStatus}
                    />
                    <BorderWrapper>
                        <Corner position="bottom-left" />
                        <Border direction="horizontal" />
                        <Corner position="bottom-right" />
                    </BorderWrapper>
                </div>
            </div>
        </div>
    );
};

export default App;
