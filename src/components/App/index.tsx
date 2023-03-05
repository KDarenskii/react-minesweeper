import React from "react";
import GameContextProvider from "../../context/gameContext/GameContextProvider";
import Difficulty from "../Difficulty";
import Game from "../Game";

import "./styles.scss";

const App: React.FC = () => {
    return (
        <div className="app">
            <div className="app__wrapper">
                <h1 className="app__title">React<br/>Minesweeper</h1>
                <GameContextProvider>
                    <Difficulty />
                    <Game />
                </GameContextProvider>
            </div>
        </div>
    );
};

export default App;
