import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isFading, setIsFading] = useState(false);

    const handleClick = () => {
        setIsFading(true);
        setTimeout(() => {
            navigate("/register");
        }, 1000);
    };

    useEffect(() => {
        setTimeout(() => {
            document.body.style.backgroundColor = "black";
        }, 600);
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <div className="bg-black w-full h-screen">
            <div
                onClick={handleClick}
                className={`w-full h-full absolute bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
                    isFading ? "opacity-0" : "opacity-100"
                }`}
                style={{
                    backgroundImage:
                        "url(/src/assets/images/main_start_screen.png)",
                }}
            ></div>
        </div>
    );
};

export default HomePage;
