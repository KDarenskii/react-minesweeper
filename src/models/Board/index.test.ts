import Board from ".";
import { CELL_STATUSES } from "../../constants/cellStatuses";

describe("Class Board", () => {
    let board: Board;

    beforeEach(() => {
        board = new Board(3, 2);
        board.initBoard();
    });

    describe("Method countMinesLeft", () => {
        test("should return initial value when board is initialized", () => {
            const minesCount = board.countMinesLeft();
            expect(minesCount).toBe(2);
        });

        test("should decrease mines count when cells are marked", () => {
            const firstCell = board.field[0][0];
            const secondCell = board.field[1][1];

            firstCell.status = CELL_STATUSES.MARKED;
            secondCell.status = CELL_STATUSES.MARKED;

            expect(board.countMinesLeft()).toBe(0);
        });
    });

    describe("Method isCellsMathing", () => {
        test("should return false when cells position is not matching", () => {
            const firstCell = board.field[0][0];
            const secondCell = board.field[1][1];

            expect(board["isCellsMathing"](firstCell, secondCell)).toBeFalsy();
        });
        test("should return true when cells position is matching", () => {
            const firstCell = board.field[0][0];
            const secondCell = board.field[0][0];

            expect(board["isCellsMathing"](firstCell, secondCell)).toBeTruthy();
        });
    });

    describe("Method clearBoard", () => {
        test("should set 'field' and 'minesPositions' properties to empty array", () => {
            board["clearBoard"]();
            expect(board.field).toHaveLength(0);
            expect(board["minesPositions"]).toHaveLength(0);
        });
    });

    describe("Method getCopyBoard", () => {
        test("should return a new board object with copied 'field' and 'minesPositions' properties", () => {
            const newBoard = board.getCopyBoard();
            expect(newBoard.field).toEqual(board.field);
            expect(newBoard["minesPositions"]).toEqual(board["minesPositions"]);
            expect(newBoard).not.toEqual(board);
        });
    });

    describe("Method generateMines", () => {
        test("should generate an array of random mines positions", () => {
            board["generateMines"]();
            expect(board["minesPositions"]).toHaveLength(2);
        });
    });

    describe("Method getNearbyCells", () => {
        beforeEach(() => {
            board.field.forEach((row) => row.forEach((cell) => (cell.hasMine = false)));
        });

        test("should return nine nearby cells and mines count equals one when current cell is not at the edge of the array and has nearby mine", () => {
            const currentCell = board.field[1][1];
            const mineCell = board.field[0][0];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(9);
            expect(minesCount).toBe(1);
        });

        test("should return nine nearby cells and mines count equals two when current cell is not at the edge of the array and has two nearby mines", () => {
            const currentCell = board.field[1][1];
            const firstMine = board.field[0][0];
            const secondMine = board.field[2][2];
            firstMine.hasMine = true;
            secondMine.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(9);
            expect(minesCount).toBe(2);
        });

        test("should return six nearby cells and mines count equals one when current cell is at the edge of the array and has nearby mine", () => {
            const currentCell = board.field[0][1];
            const mineCell = board.field[0][0];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(6);
            expect(minesCount).toBe(1);
        });

        test("should return four nearby cells and mines count equals one when current cell is in the corner of the array and has nearby mine", () => {
            const currentCell = board.field[0][0];
            const mineCell = board.field[0][1];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(4);
            expect(minesCount).toBe(1);
        });
    });

    describe("Method initBoard", () => {
        test("should initialize the board with new cells and mines", () => {
            const prevBoard = board.getCopyBoard();
            board.initBoard();
            expect(prevBoard).not.toEqual(board);
        });
    });
});
