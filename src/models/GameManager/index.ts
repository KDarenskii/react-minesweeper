import { CELL_STATUSES } from "../../constants/cellStatuses";
import Cell from "../Cell";

export default class GameManager {
    time: number = 0;
    isPlaying: boolean = false;
    isWin: boolean = false;
    isLose: boolean = false;

    public checkIsGamedEnded(field: Cell[][]) {
        this.isLose = field.some((row) => {
            return row.some((cell) => cell.status === CELL_STATUSES.HITTED_MINE);
        });
        this.isWin = field.every((row) => {
            return row.every((cell) => {
                const status = cell.status;
                return (
                    status === CELL_STATUSES.NUMBER ||
                    status === CELL_STATUSES.EMPTY ||
                    (cell.hasMine &&
                        (status === CELL_STATUSES.HIDDEN ||
                            status === CELL_STATUSES.MARKED ||
                            status === CELL_STATUSES.SUPPOSED))
                );
            });
        });
        return this.isWin || this.isLose;
    }

    public increaseTimer() {
        this.time++;
    }
}
