import React from "react";
import { SMILE_STATUSES } from "../../constants/smileStatuses";

import "./styles.scss";

type Props = {
    status: SMILE_STATUSES;
    onClick: () => void;
    onMouseDown: () => void;
}

const Smile: React.FC<Props> = ({ status, onClick, onMouseDown }) => {
    return <div className={["smile", `smile--${status}`].join(" ")} onClick={onClick} onMouseDown={onMouseDown}></div>;
};

export default Smile;
