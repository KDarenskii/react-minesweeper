import React from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import { useGameContext } from "../../context/gameContext";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Smile from "../Smile";
import Timer from "../Timer";
import Counter from "../Counter";

import "./styles.scss";

const InfoPanel: React.FC = () => {
    const { restartGame, setSmileStatus, minesLeft, smileStatus } = useGameContext();

    return (
        <div className="info-panel">
            <BorderWrapper>
                <Border direction="vertical" />
                <div className="board__header-wrapper">
                    <Counter number={minesLeft} />
                    <Smile
                        status={smileStatus}
                        onClick={restartGame}
                        onMouseDown={() => setSmileStatus(SMILE_STATUSES.PRESSED)}
                    />
                    <Timer />
                </div>
                <Border direction="vertical" />
            </BorderWrapper>
        </div>
    );
};

export default InfoPanel;
