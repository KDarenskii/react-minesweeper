import Cell from "./Cell";
import { Point } from "./types/Point";
import { getRandomNumberInRange } from "../helpers/getRandomNumberInRange";
import { CELL_STATUSES } from "../constants/cellStatuses";

export default class Board {
    readonly boardSize = 10;
    private field: Cell[][] = [];
    readonly minesNumber = 8;
    private minesPositions: Point[] = [];

    public countMinesLeft() {
        const minesCount = this.field.reduce((counter, row) => {
            return counter + row.filter((cell) => cell.status === CELL_STATUSES.MARKED).length;
        }, 0);
        return this.minesNumber - minesCount;
    }

    public initBoard() {
        for (let x = 0; x < this.boardSize; x++) {
            const row: Cell[] = [];
            for (let y = 0; y < this.boardSize; y++) {
                const cell = new Cell(x, y, false);
                row.push(cell);
            }
            this.field.push(row);
        }
    }

    public initMines() {
        while (this.minesNumber > this.minesPositions.length) {
            const newCoord = {
                x: getRandomNumberInRange(this.boardSize),
                y: getRandomNumberInRange(this.boardSize),
            };
            if (!this.minesPositions.find((coord) => coord.x === newCoord.x && coord.y === newCoord.y)) {
                this.minesPositions.push(newCoord);
            }
        }

        console.log(this.minesPositions)

        for (let x = 0; x < this.boardSize; x++) {
            for (let y = 0; y < this.boardSize; y++) {
                const hasMine = this.minesPositions.some((pos) => this.isCellsMathing(pos, { x, y }));
                const cell = this.field[x][y];
                cell.hasMine = hasMine;
            }
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

    public set setCell(cell: Cell) {
        this.field[cell.x][cell.y] = cell;
    }
    public get getField(): Cell[][] {
        return this.field;
    }
}
