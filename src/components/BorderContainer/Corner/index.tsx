import React from "react";

import "./styles.scss";

type Props = {
    position: "top-left" | "top-right" | "middle-left" | "middle-right" | "bottom-left" | "bottom-right";
};

const Corner: React.FC<Props> = ({ position }) => {
    return <div className={["corner", `corner--${position}`].join(" ")}></div>;
};

export default Corner;
