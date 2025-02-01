import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";
import "../../templates/BackgroundStyle.css";

const Tavern: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage: "url(src/assets/images/tavern_inside_v1.png)",
            }}
            className="background w-screen h-screen bg-cover flex flex-col justify-end relative overflow-hidden"
            onClick={() => navigate("/map")}
        >
            <CharacterDialog
                characterSrc="src/assets/images/town_trader_v1.png"
                text={
                    "Oh, a new face in town? I'm just finishing up, come back later, and we'll talk!"
                }
            />
        </div>
    );
};

export default Tavern;
