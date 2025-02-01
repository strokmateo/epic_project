import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";
import "../../templates/BackgroundStyle.css";

const Alley: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                backgroundImage:
                    "url(src/assets/images/dark_alleyway_pixelized_v1.png)",
            }}
            className=" background w-screen h-screen bg-cover flex flex-col justify-end relative overflow-hidden"
            onClick={() => navigate("/map")}
        >
            <CharacterDialog
                characterSrc="src/assets/images/shadowy-figure-1.png"
                text={
                    "Step away, stranger, for these shadows hold no mercy. Turn back now!"
                }
            />
        </div>
    );
};

export default Alley;
