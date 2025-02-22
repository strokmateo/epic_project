import React from "react";
import { cn } from "../lib/utils";

interface BackButtonProps {
    className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ className }) => {
    const goBack = () => {
        window.history.back();
    };
    return (
        <button
            className={cn(
                "bg-black bg-opacity-50 text-white w-36 h-12 rounded-lg z-40 transform transition-transform duration-200 hover:scale-105 hover:bg-opacity-75",
                className
            )}
            onClick={goBack}
        >
            Back
        </button>
    );
};

export default BackButton;
