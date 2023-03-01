import React from "react";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import Cell from "../../models/Cell";

import "./styles.scss";

type Props = {
    cell: Cell;
    onRightClick: (event: React.MouseEvent, cell: Cell) => void;
    onLeftClick: (cell: Cell) => void;
    onMouseDown: (event: React.MouseEvent) => void;
    onMouseUp: () => void;
};

const CellComponent: React.FC<Props> = ({ cell, onRightClick, onLeftClick, onMouseDown, onMouseUp }) => {
    return (
        <div
            className={[
                "cell",
                cell.status === CELL_STATUSES.NUMBER ? `cell--type-number-${cell.getNearbyMinesCount}` : "",
            ].join(" ")}
            data-status={cell.status}
            onClick={() => onLeftClick(cell)}
            onContextMenu={(event) => onRightClick(event, cell)}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        ></div>
    );
};

export default CellComponent;
