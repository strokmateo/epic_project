import React, { useState } from "react";
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

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div
            style={backgroundStyle}
            className="animate-fade-in w-screen h-screen bg-cover flex flex-col justify-end relative overflow-hidden font-pixel"
        >
            <button
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    width: "150px",
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    height: "50px",
                    borderRadius: "10px",
                    zIndex: 40,
                }}
                onClick={() => navigate("/map")}
            >
                Back
            </button>
            <div className="animate-fade-in absolute top-1/4 left-20 w-1/2 h-1/2 bg-black bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center justify-center">
                <h1
                    className="text-white text-7xl font-bold m-10 bg-black bg-opacity-50 hover:bg-opacity-100 p-10 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => navigate("/battle-screen")}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    START MISSION
                </h1>
                <h1
                    className="text-white text-7xl font-bold m-10 bg-black bg-opacity-50 hover:bg-opacity-100 p-10 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => navigate("/leaderboard")}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    LEADERBOARD
                </h1>
            </div>
            <CharacterDialog
                characterSrc="src/assets/images/rich-man-1.png"
                text="Choose your next move nigga."
            />
        </div>
    );
};

export default TownHall;
