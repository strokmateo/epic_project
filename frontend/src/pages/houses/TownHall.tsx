import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";

const TownHall: React.FC = () => {
    const navigate = useNavigate();
    const backgroundStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage:
            "url(src/assets/images/town_hall_inside_pixelized_v1.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };
    return (
        <div style={backgroundStyle } className="w-screen h-screen bg-cover flex flex-col justify-between relative overflow-hidden">
            <button
                style={{ backgroundColor: "white" }}
                onClick={() => navigate("/map")}
            >
                Back
            </button>
            
            <button
                style={{ backgroundColor: "black", width: "150px" }}
                className="fixed right-5 top-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded z-40"
                onClick={() => navigate("/leaderboard")}
            >
                LEADERBOARD
            </button>
            <CharacterDialog
                            characterSrc="src/assets/images/rich-man-1.png"
                            text={
                                "Step away, nigga!!"
                            }
                        />  
        </div>
    );
};

export default TownHall;
