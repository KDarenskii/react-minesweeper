import React from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import GameManager from "../../models/GameManager";

type TGameContext = {
    restartGame: (cell?: Cell) => void;
    time: number;
    isWin: boolean;
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
    isGameGoing: boolean;
    setIsGameGoing: React.Dispatch<React.SetStateAction<boolean>>;
    isGameFinished: boolean;
    setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
    smileStatus: SMILE_STATUSES;
    setSmileStatus: React.Dispatch<React.SetStateAction<SMILE_STATUSES>>;
    checkIsGameEnded: (field: Cell[][]) => boolean;
    minesLeft: number;
    updateTimer: () => void;
    initializeBoard: (cell?: Cell) => void;
    gameManager: GameManager;
};

export const GameContext = React.createContext<TGameContext>({} as TGameContext);
export const useGameContext = () => React.useContext(GameContext);
