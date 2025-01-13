import React from "react";
import { useNavigate } from "react-router-dom";

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
        <div style={backgroundStyle}>
            <button
                style={{ backgroundColor: "white" }}
                onClick={() => navigate("/map")}
            >
                Back
            </button>
        </div>
    );
};

export default TownHall;
