import Board from ".";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import Cell from "../Cell";

describe("Class Board", () => {
    let board: Board;

    beforeEach(() => {
        board = new Board(3, 2);
        board.init();
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

    describe("Method isCellsMatching", () => {
        test("should return false when cells position is not matching", () => {
            const firstCell = board.field[0][0];
            const secondCell = board.field[1][1];

            expect(board["isCellsMatching"](firstCell, secondCell)).toBeFalsy();
        });
        test("should return true when cells position is matching", () => {
            const firstCell = board.field[0][0];
            const secondCell = board.field[0][0];

            expect(board["isCellsMatching"](firstCell, secondCell)).toBeTruthy();
        });
    });

    describe("Method clear", () => {
        test("should set 'field' and 'minesPositions' properties to empty array", () => {
            board["clear"]();
            expect(board.field).toHaveLength(0);
            expect(board["minesPositions"]).toHaveLength(0);
        });
    });

    describe("Method getCopyBoard", () => {
        test("should return a new board object with copied 'field' and 'minesPositions' properties", () => {
            const newBoard = board.getCopyBoard();
            expect(newBoard.field).toEqual(board.field);
            expect(newBoard["minesPositions"]).toEqual(board["minesPositions"]);
            expect(newBoard.field).toEqual(board.field);
            expect(newBoard).not.toBe(board);
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

        test("should return nine nearby cells and mines count that equals one when current cell is not at the edge of the array and has nearby mine", () => {
            const currentCell = board.field[1][1];
            const mineCell = board.field[0][0];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(9);
            expect(minesCount).toBe(1);
        });

        test("should return nine nearby cells and mines count that equals two when current cell is not at the edge of the array and has two nearby mines", () => {
            const currentCell = board.field[1][1];
            const firstMine = board.field[0][0];
            const secondMine = board.field[2][2];
            firstMine.hasMine = true;
            secondMine.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(9);
            expect(minesCount).toBe(2);
        });

        test("should return six nearby cells and mines count that equals one when current cell is at the edge of the array and has nearby mine", () => {
            const currentCell = board.field[0][1];
            const mineCell = board.field[0][0];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(6);
            expect(minesCount).toBe(1);
        });

        test("should return four nearby cells and mines count that equals one when current cell is in the corner of the array and has nearby mine", () => {
            const currentCell = board.field[0][0];
            const mineCell = board.field[0][1];
            mineCell.hasMine = true;
            const { cells, minesCount } = board.getNearbyCells(currentCell);
            expect(cells).toHaveLength(4);
            expect(minesCount).toBe(1);
        });
    });

    describe("Method init", () => {
        test("should initialize the board with new cells and mines", () => {
            const prevBoard = board.getCopyBoard();
            board.init();
            expect(prevBoard).not.toEqual(board);
        });
    });

    describe("Method openCells", () => {
        let mineCell: Cell;

        beforeEach(() => {
            board.field.forEach((row) => row.forEach((cell) => (cell.hasMine = false)));
            mineCell = board.field[0][0];
        });

        test("should display cell as 'hitted-mine' when cell is clicked and it has mine ", () => {
            mineCell.hasMine = true;
            const clickedCell = board.field[0][0];
            board.openCells(clickedCell);
            const cellStatus = board.field[0][0].status;
            expect(cellStatus).toBe(CELL_STATUSES.HITTED_MINE);
        });

        test("should display cell as 'marked' when cell is marked and it has mine", () => {
            mineCell.hasMine = true;
            mineCell.status = CELL_STATUSES.MARKED;
            const clickedCell = board.field[1][1];
            board.openCells(clickedCell);
            const cellStatus = board.field[0][0].status;
            expect(cellStatus).toBe(CELL_STATUSES.MARKED);
        });

        test("should display cell as 'supposed' when cell is supposed and it has mine", () => {
            mineCell.hasMine = true;
            mineCell.status = CELL_STATUSES.SUPPOSED;
            const clickedCell = board.field[1][1];
            board.openCells(clickedCell);
            const cellStatus = board.field[0][0].status;
            expect(cellStatus).toBe(CELL_STATUSES.SUPPOSED);
        });

        test("should display cell as 'missed' when cell is marked and it doesn't have mine", () => {
            mineCell.status = CELL_STATUSES.MARKED;
            const clickedCell = board.field[1][1];
            board.openCells(clickedCell);
            const cellStatus = board.field[0][0].status;
            expect(cellStatus).toBe(CELL_STATUSES.MISSED);
        });

        test("should display cell as 'missed-supposed' when cell is supposed and it doesn't have mine", () => {
            mineCell.status = CELL_STATUSES.SUPPOSED;
            const clickedCell = board.field[1][1];
            board.openCells(clickedCell);
            const cellStatus = board.field[0][0].status;
            expect(cellStatus).toBe(CELL_STATUSES.MISSED_SUPPOSED);
        });
    });
});
