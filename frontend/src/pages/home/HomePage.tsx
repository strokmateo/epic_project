import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isFading, setIsFading] = useState(false);

    const handleClick = () => {
        setIsFading(true);
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    useEffect(() => {
        setTimeout(() => {
            document.body.style.backgroundColor = "black"; // Postavi crnu pozadinu kad se prikaže stranica
        }, 600);
        return () => {
            document.body.style.backgroundColor = ""; // Vrati na default kad napusti stranicu
        };
    }, []);

    return (
        <div style={{ backgroundColor: "black" }}>
            <div
                onClick={handleClick}
                className={`transition-opacity duration-500 ${
                    isFading ? "animate-fade-out" : "animate-fade-in"
                }`}
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    left: "0px",
                    top: "0px",
                    backgroundImage:
                        "url(src/assets/images/main_start_screen.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "black",
                }}
            ></div>
        </div>
    );
};

export default HomePage;
