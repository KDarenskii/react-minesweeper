import React from "react";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import Board from "../../models/Board";
import Cell from "../../models/Cell";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Corner from "../BorderContainer/Corner";
import CellComponent from "../CellComponent";
import MinesCounter from "../Counter";
import Smile from "../Smile";
import Timer from "../Timer";

import "./styles.scss";

type Props = {
    board: Board;
    setBoard: React.Dispatch<React.SetStateAction<Board>>;
    restartGame: () => void;
    isGameGoing: boolean;
};

const BoardComponent: React.FC<Props> = ({ board, setBoard, restartGame, isGameGoing }) => {
    const fieldRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        fieldRef.current?.style.setProperty("--size", `${board.boardSize}`);
    }, [board.boardSize]);

    const handleCellRightClick = (event: React.MouseEvent, cell: Cell) => {
        event.preventDefault();
        cell.changeCellStatus();
        updateBoard();
        if (!isGameGoing) {
            restartGame();
        }
    };

    const handleOpenCell = (cell: Cell, isClicked: boolean = true) => {
        cell.openCell(isClicked);

        if (cell.status === CELL_STATUSES.NUMBER) {
            const { cells, minesCount } = board.getNearbyCells(cell);

            cell.setNearbyMinesCount = minesCount;

            if (minesCount === 0) {
                cell.status = CELL_STATUSES.EMPTY;
                cells.forEach((cell) => handleOpenCell(cell, false));
            }
        }
        updateBoard();
        if (!isGameGoing) {
            restartGame();
        }
    };

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    return (
        <div className="board">
            <div className="board__body">
                <BorderWrapper>
                    <Border length="long" direction="vertical" />
                    <div className="board__field" ref={fieldRef}>
                        {board.getField.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.map((cell) => (
                                    <CellComponent
                                        cell={cell}
                                        key={cell.id}
                                        onLeftClick={handleOpenCell}
                                        onRightClick={handleCellRightClick}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                    <Border length="long" direction="vertical" />
                </BorderWrapper>
            </div>
        </div>
    );
};

export default BoardComponent;
