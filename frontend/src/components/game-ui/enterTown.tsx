import { useEffect, useState } from "react";
import CharacterDialog from "./characterDialog";

export default function EnterTown({ onClick }: { onClick: () => void }) {
    const eventSequence = ["start", "blackToPixelated", "pixelatedToDark"];
    const [stepIndex, setStepIndex] = useState<number>(0);
    const [dialogVisibilty, setDialogVisibilty] = useState<boolean>(true);

    const currentEvent = eventSequence[stepIndex];

    // useEffect for transitioning between steps
    useEffect(() => {
        if (stepIndex === 0) {
            const timeout = setTimeout(() => {
                setStepIndex((prev) => prev + 1);
            }, 2500);

            return () => clearTimeout(timeout); // Cleanup timeout
        } else if (stepIndex === 1) {
            const timeout = setTimeout(() => {
                setStepIndex((prev) => prev + 1);
            }, 2500);

            return () => clearTimeout(timeout); // Cleanup timeout
        }
    }, [stepIndex]);

    // Render element based on the current step
    let renderElement: React.ReactElement = (
        <div className="bg-black h-screen w-screen"></div>
    );

    if (currentEvent === "blackToPixelated") {
        renderElement = (
            <div className="bg-auth-background w-screen h-screen bg-cover opacity-0 animate-fade-in"></div>
        );
    }
    if (currentEvent === "pixelatedToDark") {
        renderElement = (
            <div
                onClick={() => {
                    setDialogVisibilty(false);
                    setTimeout(() => {
                        onClick();
                    }, 500);
                }}
                className="bg-auth-background w-screen h-screen bg-cover flex items-end relative overflow-hidden"
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 animate-fade-in z-10"></div>
                <CharacterDialog
                    className="z-30"
                    characterSrc="src/assets/images/town-guard-1.png"
                    text="Ho there, traveler! An unfamiliar face graces our gates. Who might ye be, and what business brings thee to our humble town?"
                    dialogVisibility={dialogVisibilty}
                />
            </div>
        );
    }

    return renderElement;
}
