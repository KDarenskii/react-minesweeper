import { CELL_STATUSES } from "../constants/cellStatuses";

export default class Cell {
    status: CELL_STATUSES = CELL_STATUSES.HIDDEN;
    private nearbyMinesCount: number = 0;
    hasMine: boolean;
    readonly id: string;
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number, hasMine: boolean) {
        this.id = String(Math.random());
        this.x = x;
        this.y = y;
        this.hasMine = hasMine;
    }

    public changeCellStatus() {
        if (this.status === CELL_STATUSES.EMPTY) return;

        if (this.status === CELL_STATUSES.HIDDEN) {
            this.status = CELL_STATUSES.MARKED;
        } else if (this.status === CELL_STATUSES.MARKED) {
            this.status = CELL_STATUSES.SUPPOSED;
        } else if (this.status === CELL_STATUSES.SUPPOSED) {
            this.status = CELL_STATUSES.HIDDEN;
        }
        return;
    }

    public openCell(isClicked: boolean) {
        if (this.status !== CELL_STATUSES.HIDDEN) return;

        if (this.hasMine && isClicked) {
            this.status = CELL_STATUSES.HITTED_MINE;
        } else if (this.hasMine) {
            this.status = CELL_STATUSES.HIDDEN;
        } else {
            this.status = CELL_STATUSES.NUMBER;
        }
    }

    public set setNearbyMinesCount(count: number) {
        if (count < 0) {
            this.setNearbyMinesCount = 0;
        } else {
            this.nearbyMinesCount = count;
        }
    }

    public get getNearbyMinesCount() {
        return this.nearbyMinesCount;
    }
}
