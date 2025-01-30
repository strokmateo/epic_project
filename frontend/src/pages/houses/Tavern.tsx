import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";

const Tavern: React.FC = () => {
    const navigate = useNavigate();
    const backgroundStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage: "url(src/assets/images/tavern_inside_v1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };
    return (
        <div
            style={backgroundStyle}
            className="w-screen h-screen bg-cover flex flex-col justify-end relative overflow-hidden"
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
