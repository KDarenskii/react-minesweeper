import React, { useEffect } from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import { useGameContext } from "../../context/gameContext";
import BoardComponent from "../BoardComponent";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Corner from "../BorderContainer/Corner";
import InfoPanel from "../InfoPanel";
import Statistics from "../Statistics";

import "./styles.scss";

const Game: React.FC = () => {

    const { initializeBoard, isGameFinished, setSmileStatus, gameManager } = useGameContext();


    React.useEffect(() => {
        if (isGameFinished) {
            setSmileStatus(gameManager.isWin ? SMILE_STATUSES.WIN : SMILE_STATUSES.LOSE);
        } else {
            setSmileStatus(SMILE_STATUSES.UNPRESSED);
        }
    }, [isGameFinished, setSmileStatus, gameManager.isWin]);

    useEffect(() => {
        initializeBoard();
    }, [initializeBoard]);

    return (
        <div className="game">
            <Statistics />
            <div className="game__board">
                <BorderWrapper>
                    <Corner position="top-left" />
                    <Border direction="horizontal" />
                    <Corner position="top-right" />
                </BorderWrapper>

                <InfoPanel />
                
                <BorderWrapper>
                    <Corner position="middle-left" />
                    <Border direction="horizontal" />
                    <Corner position="middle-right" />
                </BorderWrapper>

                <BoardComponent />

                <BorderWrapper>
                    <Corner position="bottom-left" />
                    <Border direction="horizontal" />
                    <Corner position="bottom-right" />
                </BorderWrapper>
            </div>
        </div>
    );
};

export default Game;
