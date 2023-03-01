import React from "react";
import GameContextProvider from "../../context/gameContext/GameContextProvider";
import Game from "../Game";

import "./styles.scss";

const App: React.FC = () => {

    return (
        <div className="app">
            <GameContextProvider>
                <Game />
            </GameContextProvider>
        </div>
    );
};

export default App;
