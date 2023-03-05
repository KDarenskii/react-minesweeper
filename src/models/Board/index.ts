import Cell from "../Cell";
import { Point } from "../types/Point";
import { getRandomNumberInRange } from "../../helpers/getRandomNumberInRange";
import { CELL_STATUSES } from "../../constants/cellStatuses";

export default class Board {
    readonly boardSize: number;
    field: Cell[][] = [];
    readonly minesNumber: number;
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

    public init(cell?: Cell) {
        this.clear();

        do {
            this.generateMines();
        } while (cell && this.minesPositions.some((pos) => cell.x === pos.x && cell.y === pos.y));

        for (let x = 0; x < this.boardSize; x++) {
            const row: Cell[] = [];
            for (let y = 0; y < this.boardSize; y++) {
                const currentCell = new Cell(x, y, false);
                const hasMine = this.minesPositions.some((pos) => this.isCellsMatching(pos, { x, y }));
                currentCell.hasMine = hasMine;
                if (cell && this.isCellsMatching(cell, currentCell)) {
                    row.push(cell);
                } else {
                    row.push(currentCell);
                }
            }
            this.field.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board(this.boardSize, this.minesNumber);
        newBoard.field = this.field;
        newBoard.minesPositions = this.minesPositions;
        return newBoard;
    }

    private isCellsMatching(a: Point, b: Point) {
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

    private clear() {
        this.field = [];
        this.minesPositions = [];
    }

    public openCells(cell: Cell) {
        this.field.forEach((row) =>
            row.forEach((currentCell) => {
                const status = currentCell.status;
                const hasMine = currentCell.hasMine;

                if (hasMine && this.isCellsMatching(currentCell, cell)) {
                    currentCell.status = CELL_STATUSES.HITTED_MINE;
                } else if (hasMine && status !== CELL_STATUSES.MARKED && status !== CELL_STATUSES.SUPPOSED) {
                    currentCell.status = CELL_STATUSES.MINE;
                } else if (!hasMine && status === CELL_STATUSES.MARKED) {
                    currentCell.status = CELL_STATUSES.MISSED;
                } else if (!hasMine && status === CELL_STATUSES.SUPPOSED) {
                    currentCell.status = CELL_STATUSES.MISSED_SUPPOSED;
                }
            })
        );
    }
}
