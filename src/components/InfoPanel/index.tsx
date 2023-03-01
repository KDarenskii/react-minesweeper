import React from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import MinesCounter from "../Counter";
import Smile from "../Smile";
import Timer from "../Timer";

import "./styles.scss";

type Props = {
    isGameGoing: boolean;
    minesLeft: number;
    updateTimer: () => void;
    smileStatus: SMILE_STATUSES;
    restartGame: () => void;
    setSmileStatus: React.Dispatch<React.SetStateAction<SMILE_STATUSES>>;
};

const InfoPanel: React.FC<Props> = ({ isGameGoing, minesLeft, updateTimer, smileStatus, restartGame, setSmileStatus }) => {
    return (
        <div className="info-panel">
            <BorderWrapper>
                <Border direction="vertical" />
                <div className="board__header-wrapper">
                    <MinesCounter number={minesLeft} />
                    <Smile status={smileStatus} onClick={restartGame} onMouseDown={() => setSmileStatus(SMILE_STATUSES.PRESSED)} />
                    <Timer isGameGoing={isGameGoing} updateTimer={updateTimer} />
                </div>
                <Border direction="vertical" />
            </BorderWrapper>
        </div>
    );
};

export default InfoPanel;
