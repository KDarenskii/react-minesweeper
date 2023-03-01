import React, { useState, useEffect } from "react";
import Board from "../models/Board";
import GameManager from "../models/GameManager";
import BoardComponent from "./BoardComponent";
import Border from "./BorderContainer/Border";
import BorderWrapper from "./BorderContainer/BorderWrapper";
import Corner from "./BorderContainer/Corner";
import InfoPanel from "./InfoPanel";

const App: React.FC = () => {
    const [gameManager, setGameManager] = useState(new GameManager());
    const [board, setBoard] = useState(new Board());
    const [isGameGoing, setIsGameGoing] = useState(gameManager.isPlaying);

    useEffect(() => {
        const initializedBoard = new Board();
        initializedBoard.initBoard();
        setBoard(initializedBoard);
    }, []);

    const restartGame = () => {
        board.initMines();
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);

        const newGameManager = new GameManager();
        newGameManager.isPlaying = true;
        setIsGameGoing(true);
        setGameManager(newGameManager);
    };

    return (
        <div className="wrapper">
            <BorderWrapper>
                <Corner position="top-left" />
                <Border direction="horizontal" />
                <Corner position="top-right" />
            </BorderWrapper>
            <InfoPanel isGameGoing={isGameGoing} minesLeft={board.countMinesLeft()} />
            <BorderWrapper>
                <Corner position="middle-left" />
                <Border direction="horizontal" />
                <Corner position="middle-right" />
            </BorderWrapper>
            <BoardComponent board={board} setBoard={setBoard} restartGame={restartGame} isGameGoing={isGameGoing} />
            <BorderWrapper>
                <Corner position="bottom-left" />
                <Border direction="horizontal" />
                <Corner position="bottom-right" />
            </BorderWrapper>
        </div>
    );
};

export default App;
