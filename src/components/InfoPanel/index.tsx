import React from "react";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import MinesCounter from "../Counter";
import Smile from "../Smile";
import Timer from "../Timer";

import "./styles.scss";

type Props = {
    isGameGoing: boolean;
    minesLeft: number;
};

const InfoPanel: React.FC<Props> = ({ isGameGoing, minesLeft }) => {
    return (
        <div className="info-panel">
            <BorderWrapper>
                <Border direction="vertical" />
                <div className="board__header-wrapper">
                    <MinesCounter number={minesLeft} />
                    <Smile />
                    <Timer isGameGoing={isGameGoing} />
                </div>
                <Border direction="vertical" />
            </BorderWrapper>
        </div>
    );
};

export default InfoPanel;
