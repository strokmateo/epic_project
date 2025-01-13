import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Map: React.FC = () => {
    const navigate = useNavigate();

    const houses = [
        { id: 1, name: "Tavern", displayName: "Tavern", x: "33%", y: "25%" },
        {
            id: 2,
            name: "Town Hall",
            displayName: "Town Hall",
            x: "47%",
            y: "38%",
        },
        { id: 3, name: "Alley", displayName: "???", x: "70%", y: "50%" },
        {
            id: 4,
            name: "Wizard Hut",
            displayName: "Wizard Hut",
            x: "59%",
            y: "75%",
        },
    ];

    //state za hoveranu kuću
    const [hoveredHouse, setHoveredHouse] = useState<null | {
        id: number;
        name: string;
        displayName: string;
        description: string;
        x: string;
        y: string;
    }>(null);

    //mapa
    const mapStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage: "url(src/assets/images/fighting_town.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    //točkice
    const dotStyle: React.CSSProperties = {
        position: "absolute",
        width: "30px",
        height: "30px",
        backgroundColor: "black",
        borderRadius: "50%",
        cursor: "pointer",
    };

    //hover style
    const infoHoverStyle: React.CSSProperties = {
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        border: "1px solid white",
        borderRadius: "5px",
        pointerEvents: "none",
        transform: "translate(0%, 50%)",
        zIndex: 1000,
    };

    return (
        <div
            style={{
                ...mapStyle,
                fontFamily: "Pixelify Sans, serif",
            }}
            className="animate-fade-in"
        >
            {houses.map((house) => (
                <div
                    key={house.id}
                    className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer
                    	transition-transform duration-300 hover:scale-125 hover:bg-yellow-500"
                    style={{ ...dotStyle, left: house.x, top: house.y }}
                    onClick={() =>
                        //navigacija na određenu kuću (ime kuće pretvoreno u lowercase i razmak zamijenjen s crticom)
                        navigate(
                            "/" + house.name.toLowerCase().replace(" ", "-")
                        )
                    }
                    onMouseEnter={() => {
                        if (house.name === "Tavern") {
                            setHoveredHouse({
                                ...house,
                                displayName: house.displayName,
                                description:
                                    "The Tavern is a place where you can trade with Mateo.",
                            });
                        } else if (house.name === "Town Hall") {
                            setHoveredHouse({
                                ...house,
                                displayName: house.displayName,
                                description:
                                    "The Town Hall is a place where you embark on your next adventure.",
                            });
                        } else if (house.name === "Wizard Hut") {
                            setHoveredHouse({
                                ...house,
                                displayName: house.displayName,
                                description:
                                    "The Wizard Hut is a place where you can buy spells and potions from Shippy.",
                            });
                        } else if (house.name === "Alley") {
                            setHoveredHouse({
                                ...house,
                                displayName: house.displayName,
                                description: "This is a mysterious place.",
                            });
                        }
                    }}
                    onMouseLeave={() => setHoveredHouse(null)}
                />
            ))}
            {hoveredHouse && (
                <div
                    style={{
                        ...infoHoverStyle,
                        left: hoveredHouse.x,
                        top: hoveredHouse.y,
                    }}
                >
                    <h3>{hoveredHouse.displayName}</h3>
                    <p>{hoveredHouse.description}</p>
                </div>
            )}
        </div>
    );
};

export default Map;
