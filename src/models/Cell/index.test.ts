import Cell from ".";
import { CELL_STATUSES } from "../../constants/cellStatuses";

describe("Class Cell", () => {
    describe("Method changeStatus", () => {
        let cell: Cell;

        beforeEach(() => {
            cell = new Cell(1, 1, false);
        });

        test("should not change status when cell status equals 'empty' ", () => {
            cell.status = CELL_STATUSES.EMPTY;
            cell.changeStatus();
            expect(cell.status).toBe(CELL_STATUSES.EMPTY);
        });
        test("should change status to 'marked' when cell status equals 'hidden' ", () => {
            cell.status = CELL_STATUSES.HIDDEN;
            cell.changeStatus();
            expect(cell.status).toBe(CELL_STATUSES.MARKED);
        });
        test("should change status to 'supposed' when cell status equals 'marked' ", () => {
            cell.status = CELL_STATUSES.MARKED;
            cell.changeStatus();
            expect(cell.status).toBe(CELL_STATUSES.SUPPOSED);
        });
        test("should change status to 'hidden' when cell status equals 'supposed' ", () => {
            cell.status = CELL_STATUSES.SUPPOSED;
            cell.changeStatus();
            expect(cell.status).toBe(CELL_STATUSES.HIDDEN);
        });
    });

    describe("Method open", () => {
        test("should not change status when cell status does not equal 'hidden'", () => {
            const cell = new Cell(1, 1, false);
            cell.status = CELL_STATUSES.MINE;
            cell.open(false);
            expect(cell.status).toBe(CELL_STATUSES.MINE);
        })
        test("should change status to 'hitted-mine' when cell is clicked and it has mine", () => {
            const cell = new Cell(1, 1, true);
            cell.open(true);
            expect(cell.status).toBe(CELL_STATUSES.HITTED_MINE);
        })
        test("should change status to 'hidden' when cell is not clicked and it has mine", () => {
            const cell = new Cell(1, 1, true);
            cell.open(false);
            expect(cell.status).toBe(CELL_STATUSES.HIDDEN);
        })
        test("should change status to 'number' when cell is not clicked and it does not have mine", () => {
            const cell = new Cell(1, 1, false);
            cell.open(false);
            expect(cell.status).toBe(CELL_STATUSES.NUMBER);
        })
    })
});
