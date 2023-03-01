import React from "react";

import "./styles.scss";

type Props = {
    children: React.ReactNode;
};

const BorderWrapper: React.FC<Props> = ({ children }) => {
    return <div className="border-wrapper">{children}</div>;
};

export default BorderWrapper;
