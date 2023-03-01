import React, { useState, useCallback } from "react";
import { GameContext } from ".";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import GameManager from "../../models/GameManager";

type Props = {
    children: React.ReactNode;
};

const GameContextProvider: React.FC<Props> = ({ children }) => {
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

    const restartGame = () => {
        initializeBoard();

        const newGameManager = new GameManager();
        newGameManager.isPlaying = false;
        setIsGameGoing(false);
        setIsGameFinished(false);
        setGameManager(newGameManager);
        setSmileStatus(SMILE_STATUSES.UNPRESSED);
    };

    return (
        <GameContext.Provider
            value={{
                restartGame,
                time: gameManager.time,
                isWin: gameManager.isWin,
                board,
                setBoard,
                isGameFinished,
                setIsGameFinished,
                isGameGoing,
                setIsGameGoing,
                smileStatus,
                setSmileStatus,
                checkIsGameEnded: () => gameManager.checkIsGamedEnded(board.field),
                minesLeft: board.countMinesLeft(),
                updateTimer: () => gameManager.increaseTimer(),
                initializeBoard,
                gameManager
            }}
        >
            {children}
        </GameContext.Provider>
    );
};

export default GameContextProvider;
