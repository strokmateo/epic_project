import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";

const Alley: React.FC = () => {
    const navigate = useNavigate();
    const backgroundStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage:
            "url(src/assets/images/dark_alleyway_pixelized_v1.png)",
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
            {/* treba promijeniti sprite (trenutno je vojnik umjesto shadowy figure (kojeg jos nemamo)) */}
            <CharacterDialog
                characterSrc="src/assets/images/shadowy-figure-1.png"
                text={
                    "Step away, stranger, for these shadows hold no mercy. Turn back now, or invite a fate you cannot escape!"
                }
            />
        </div>
    );
};

export default Alley;
