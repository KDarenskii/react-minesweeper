export enum GAME_DIFFICULTIES {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard",
}

type GameSettings = {
    boardSize: number;
    minesCount: number;
};

export const GAME_DIFFICULTIES_VALUES: { [key in GAME_DIFFICULTIES]: GameSettings } = {
    [GAME_DIFFICULTIES.EASY]: {
        boardSize: 10,
        minesCount: 8,
    },
    [GAME_DIFFICULTIES.NORMAL]: {
        boardSize: 16,
        minesCount: 40,
    },
    [GAME_DIFFICULTIES.HARD]: {
        boardSize: 20,
        minesCount: 50,
    },
};
