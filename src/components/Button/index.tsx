import React from "react";

import "./styles.scss";

type Props = {
    type: "danger" | "success" | "notion";
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
};

const Button: React.FC<Props> = ({ children, type, onClick, className }) => {
    return (
        <button className={["button", `button--${type}`, className ?? ""].join(" ")} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
