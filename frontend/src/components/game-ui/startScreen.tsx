import { useState, useEffect } from "react";

export default function StartScreen({ onClick }: { onClick: () => void }) {
    const [textToggle, setTextToggle] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextToggle((prevState) => !prevState);
        }, 666);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            onClick={onClick}
            className="bg-black bg-cover h-screen bg-center flex justify-center items-end"
        >
            {textToggle && (
                <p className="font-pixel text-white mb-[150px] text-[32px]">
                    Mouse click to continue
                </p>
            )}
        </div>
    );
}
