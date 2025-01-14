import { useState, useEffect } from "react";

export default function TypewriterEffect({
    text,
    speed = 50,
    className = "",
}: {
    text: string;
    speed?: number;
    className?: string;
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [displayClickNext, setDisplayClickNext] = useState<boolean>(false);

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < text.length) {
                // Directly set the substring of the text
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setDisplayClickNext(true);
                clearInterval(interval); // Stop the interval when done
            }
        }, speed);

        return () => clearInterval(interval); // Clean up on component unmount
    }, [text, speed]);

    return (
        <p className={className}>
            {displayedText}
            {displayClickNext && (
                <p className="animate-fade-dialog"> Click to Continue</p>
            )}
        </p>
    );
}
