import React from "react";
import { CELL_STATUSES } from "../../constants/cellStatuses";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import { useGameContext } from "../../context/gameContext";
import Cell from "../../models/Cell";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import CellComponent from "../CellComponent";

import "./styles.scss";

const BoardComponent: React.FC = () => {
    const fieldRef = React.useRef<HTMLDivElement | null>(null);
    const [isOpenedCell, setIsOpenedCell] = React.useState(false);

    const {
        checkIsGameEnded,
        setSmileStatus,
        isGameFinished,
        setIsGameFinished,
        setIsGameGoing,
        board,
        setBoard,
        restartGame,
    } = useGameContext();

    React.useEffect(() => {
        fieldRef.current?.style.setProperty("--size", `${board.boardSize}`);
    }, [board.boardSize]);

    const handleCellRightClick = (event: React.MouseEvent, cell: Cell) => {
        if (isGameFinished) return;
        event.preventDefault();
        cell.changeCellStatus();
        updateBoard();
        setIsGameGoing(true);
    };

    const handleOpenCell = (cell: Cell, isClicked: boolean = true) => {
        if (isGameFinished) return;

        if (!isOpenedCell && cell.hasMine) {
            restartGame(cell);
            cell.hasMine = false;
        }

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

        setIsGameGoing(true);
        setIsOpenedCell(true);

        if (checkIsGameEnded(board.field)) {
            setIsGameGoing(false);
            setIsGameFinished(true);
            board.openCells(cell);
            updateBoard();
        }
    };

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        if (event.button !== 2) {
            setSmileStatus(SMILE_STATUSES.AFRAID);
        }
    };

    return (
        <div className="board">
            <div className="board__body">
                <BorderWrapper>
                    <Border length="long" direction="vertical" />
                    <div className="board__field" ref={fieldRef}>
                        {board.field.map((row, index) => (
                            <React.Fragment key={index}>
                                {row.map((cell) => (
                                    <CellComponent
                                        cell={cell}
                                        key={cell.id}
                                        onLeftClick={handleOpenCell}
                                        onRightClick={handleCellRightClick}
                                        onMouseDown={handleMouseDown}
                                        onMouseUp={() => setSmileStatus(SMILE_STATUSES.UNPRESSED)}
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
