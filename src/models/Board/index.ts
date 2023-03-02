import Cell from "../Cell";
import { Point } from "../types/Point";
import { getRandomNumberInRange } from "../../helpers/getRandomNumberInRange";
import { CELL_STATUSES } from "../../constants/cellStatuses";

export default class Board {
    readonly boardSize;
    field: Cell[][] = [];
    readonly minesNumber;
    private minesPositions: Point[] = [];

    constructor(boardSize: number = 10, minesNumber: number = 8) {
        this.boardSize = boardSize;
        this.minesNumber = minesNumber;
    }

    public countMinesLeft() {
        const minesCount = this.field.reduce((counter, row) => {
            return counter + row.filter((cell) => cell.status === CELL_STATUSES.MARKED).length;
        }, 0);
        return this.minesNumber - minesCount;
    }

    private generateMines() {
        while (this.minesNumber > this.minesPositions.length) {
            const newCoord = {
                x: getRandomNumberInRange(this.boardSize),
                y: getRandomNumberInRange(this.boardSize),
            };
            if (!this.minesPositions.find((coord) => coord.x === newCoord.x && coord.y === newCoord.y)) {
                this.minesPositions.push(newCoord);
            }
        }
    }

    public initBoard(cell?: Cell) {
        this.clearBoard();

        do {
            this.generateMines();
        } while (cell && this.minesPositions.some((pos) => cell.x === pos.x && cell.y === pos.y));

        for (let x = 0; x < this.boardSize; x++) {
            const row: Cell[] = [];
            for (let y = 0; y < this.boardSize; y++) {
                const currentCell = new Cell(x, y, false);
                const hasMine = this.minesPositions.some((pos) => this.isCellsMathing(pos, { x, y }));
                currentCell.hasMine = hasMine;
                if (cell && this.isCellsMathing(cell, currentCell)) {
                    row.push(cell);
                } else {
                    row.push(currentCell);
                }
            }
            this.field.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.field = this.field;
        newBoard.minesPositions = this.minesPositions;
        return newBoard;
    }

    private isCellsMathing(a: Point, b: Point) {
        return a.x === b.x && a.y === b.y;
    }

    public getNearbyCells(cell: Cell) {
        const cells: Cell[] = [];
        let minesCount = 0;
        for (let nearX = -1; nearX < 2; nearX++) {
            for (let nearY = -1; nearY < 2; nearY++) {
                const nearCell = this.field[cell.x + nearX]?.[cell.y + nearY];
                if (nearCell) {
                    cells.push(nearCell);
                    if (nearCell.hasMine) {
                        minesCount++;
                    }
                }
            }
        }
        return { cells, minesCount };
    }

    private clearBoard() {
        this.field = [];
        this.minesPositions = [];
    }

    public openCells(cell: Cell) {
        this.field.forEach((row) =>
            row.forEach((currentCell) => {
                const status = currentCell.status;
                const hasMine = currentCell.hasMine;

                if (hasMine && this.isCellsMathing(currentCell, cell)) {
                    currentCell.status = CELL_STATUSES.MISSED;
                } else if (hasMine) {
                    currentCell.status = CELL_STATUSES.MINE;
                } else if (status === CELL_STATUSES.MARKED && !hasMine) {
                    currentCell.status = CELL_STATUSES.MISSED;
                }
            })
        );
    }
}
