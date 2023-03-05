import React, { useEffect } from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";
import { useGameContext } from "../../context/gameContext";
import Border from "../BorderContainer/Border";
import BorderWrapper from "../BorderContainer/BorderWrapper";
import Smile from "../Smile";
import Timer from "../Timer";
import Counter from "../Counter";
import ConfimModal from "../modals/Confirm";

import "./styles.scss";

const InfoPanel: React.FC = () => {
    const { restartGame, setSmileStatus, minesLeft, smileStatus, isGameGoing } = useGameContext();

    const [isConfirmActive, setIsConfirmActive] = React.useState(false);

    const handleSmileCLick = () => {
        if (isGameGoing) setIsConfirmActive(true);
        else restartGame();
    };

    const handleAgree = () => {
        setIsConfirmActive(false);
        restartGame();
    };

    const handleDisagree = () => {
        setIsConfirmActive(false);
        setSmileStatus(SMILE_STATUSES.UNPRESSED);
    };

    useEffect(() => {
        if (isConfirmActive) {
            document.body.classList.add("body--overflow");
        } else {
            document.body.classList.remove("body--overflow");
        }
    }, [isConfirmActive]);

    return (
        <>
            {isConfirmActive && <ConfimModal handleAgree={handleAgree} handleDisagree={handleDisagree} />}
            <div className="info-panel">
                <BorderWrapper>
                    <Border direction="vertical" />
                    <div className="info-panel__wrapper">
                        <Counter number={minesLeft} />
                        <Smile
                            status={smileStatus}
                            onClick={handleSmileCLick}
                            onMouseDown={() => setSmileStatus(SMILE_STATUSES.PRESSED)}
                        />
                        <Timer />
                    </div>
                    <Border direction="vertical" />
                </BorderWrapper>
            </div>
        </>
    );
};

export default InfoPanel;
