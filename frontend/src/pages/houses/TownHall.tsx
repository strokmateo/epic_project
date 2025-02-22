import React from "react";
import CharacterDialog from "../../components/game-ui/characterDialog";
import NavButton from "../../templates/NavButton";
import BackButton from "../../templates/BackButton";
import "../../templates/BackgroundStyle.css";

const TownHall: React.FC = () => {
    return (
        <div
            className="background animate-fade-in w-screen h-screen bg-cover flex flex-col justify-between relative overflow-hidden font-pixel"
            style={{
                backgroundImage:
                    "url(src/assets/images/town_hall_inside_pixelized_v1.png)",
            }}
        >
            <BackButton className="mt-5 ml-5" />
            <div className="animate-fade-in bg-black w-[850px] ml-5 bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center justify-center">
                <NavButton
                    className="p-8"
                    text="START MISSION"
                    link="/battle-screen"
                />
                <NavButton
                    className="p-8"
                    text="LEADERBOARD"
                    link="/leaderboard"
                />
            </div>
            <CharacterDialog
                characterSrc="src/assets/images/rich-man-1.png"
                text="Choose your next move."
            />
        </div>
    );
};

export default TownHall;
