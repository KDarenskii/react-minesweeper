import React from "react";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import Cell from "../../models/Cell";

import "./styles.scss";

type Props = {
    cell: Cell;
    onRightClick: (event: React.MouseEvent, cell: Cell) => void;
    onLeftClick: (cell: Cell) => void;
};

const CellComponent: React.FC<Props> = ({ cell, onRightClick, onLeftClick }) => {
    return (
        <div
            className={[
                "cell",
                cell.status === CELL_STATUSES.NUMBER ? `cell--type-number-${cell.getNearbyMinesCount}` : "",
            ].join(" ")}
            data-status={cell.status}
            onClick={() => onLeftClick(cell)}
            onContextMenu={(event) => onRightClick(event, cell)}
        ></div>
    );
};

export default CellComponent;
