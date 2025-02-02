import React from "react";
import BackButton from "../../templates/BackButton";
import "../../templates/BackgroundStyle.css";
import Board from "./Board";

const Leaderboard: React.FC = () => {
    return (
        <div className="bg-leaderboard-background background animate-fade-in overflow-hidden font-pixel">
            <BackButton />
            <Board />
        </div>
    );
};

export default Leaderboard;
