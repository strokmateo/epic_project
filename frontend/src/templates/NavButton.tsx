import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

interface NavButtonProps {
    text: string;
    link: string;
    className?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, link, className }) => {
    return (
        <Link
            to={link}
            className={cn(
                "text-white text-7xl font-bold m-10 bg-black bg-opacity-50 hover:bg-opacity-100 p-10 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer",
                className
            )}
        >
            {text}
        </Link>
    );
};

export default NavButton;
