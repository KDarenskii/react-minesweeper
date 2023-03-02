import GameManager from ".";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import Cell from "../Cell";

describe("Class GameManager", () => {

    let gameManager: GameManager;
    let field: Cell[][] = [];

    beforeEach(() => {
        gameManager = new GameManager();

        field = [];
        for (let x = 0; x < 3; x++) {
            const row: Cell[] = [];
            for (let y = 0; y < 3; y++) {
                const cell = new Cell(x, y, false);
                row.push(cell);
            }
            field.push(row);
        }
    });

    describe("Method increaseTimer", () => {
        test("should increase time property by 1", () => {
            expect(gameManager.time).toBe(0);
            gameManager.increaseTimer();
            expect(gameManager.time).toBe(1);
        });
    });

    describe("Method checkIsGameEnded", () => {

        test("should return false when all cells have status 'hidden'", () => {
            expect(gameManager.checkIsGamedEnded(field)).toBeFalsy();
        });

        test("should return false when cells are opend and they do not have mine", () => {
            const firstCell = field[0][0];
            const secondCell = field[1][1];

            firstCell.status = CELL_STATUSES.NUMBER;
            secondCell.status = CELL_STATUSES.EMPTY;

            expect(gameManager.checkIsGamedEnded(field)).toBeFalsy();
        });

        test("should return true and set isLose property to true when any cell has status 'hitted-mine'", () => {
            const cell = field[1][1];
            cell.status = CELL_STATUSES.HITTED_MINE;
            expect(gameManager.checkIsGamedEnded(field)).toBeTruthy();
            expect(gameManager.isLose).toBeTruthy();
            expect(gameManager.isWin).toBeFalsy();
        });

        test("should return true and set isWin property to true when only mines left on the field", () => {
            field.forEach((row) =>
                row.forEach((cell) => {
                    cell.status = CELL_STATUSES.EMPTY;
                })
            );

            const mineCell = field[1][1];
            mineCell.hasMine = true;
            mineCell.status = CELL_STATUSES.HIDDEN;

            expect(gameManager.checkIsGamedEnded(field)).toBeTruthy();
            expect(gameManager.isWin).toBeTruthy();
            expect(gameManager.isLose).toBeFalsy();
        });
    });
});
