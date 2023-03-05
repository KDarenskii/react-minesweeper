import React from "react";
import { GAME_DIFFICULTIES } from "../../constants/gameDifficulties";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import GameManager from "../../models/GameManager";

type GameState = {
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
    difficulty: GAME_DIFFICULTIES | null;
    setDifficulty: React.Dispatch<React.SetStateAction<GAME_DIFFICULTIES | null>>;
};

export const GameContext = React.createContext<GameState>({} as GameState);
export const useGameContext = () => React.useContext(GameContext);
