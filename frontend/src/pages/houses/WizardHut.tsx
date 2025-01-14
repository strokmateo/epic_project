import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";

const WizardHut: React.FC = () => {
    const navigate = useNavigate();
    const backgroundStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage: "url(src/assets/images/wizard_shack_pixelated_v1.png)",
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
                characterSrc="src/assets/images/wizard_programmer_v1.png"
                text={
                    "Who are you? What do you want? I'm busy coding the next big thing in the world of magic!"
                }
            />
        </div>
    );
};

export default WizardHut;
