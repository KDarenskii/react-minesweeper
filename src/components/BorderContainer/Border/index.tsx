import React from "react";

import "./styles.scss";

type Props = {
    direction: "vertical" | "horizontal";
};

const Border: React.FC<Props> = ({ direction }) => {
    return <div className={["border", `border--${direction}`].join(" ")}></div>;
};

export default Border;
