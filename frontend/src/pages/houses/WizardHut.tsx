import React from "react";
import { useNavigate } from "react-router-dom";
import CharacterDialog from "../../components/game-ui/characterDialog";
import "../../templates/BackgroundStyle.css";

const WizardHut: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-wizard-hut-background background animate-fade-in w-screen h-screen bg-cover flex flex-col justify-end relative overflow-hidden"
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
