import React from "react";

import "./styles.scss";

type Props = {
    direction: "vertical" | "horizontal";
    length?: "long";
};

const Border: React.FC<Props> = ({ direction, length }) => {
    return <div className={["border", `border--${direction}`, length && "border--long"].join(" ")}></div>;
};

export default Border;
