import { useEffect, useState } from "react";

export default function EnterTown({ onClick }: { onClick: () => void }) {
    const eventSequence = ["start", "blackToPixelated"];
    const [stepIndex, setStepIndex] = useState<number>(0);

    const currentEvent = eventSequence[stepIndex];

    // useEffect for transitioning between steps
    useEffect(() => {
        if (stepIndex === 0) {
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

    return renderElement;
}
