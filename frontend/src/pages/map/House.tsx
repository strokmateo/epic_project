import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const House: React.FC = () => {
    const navigate = useNavigate();
    const houses = [
        {
            id: 1,
            name: "Tavern",
            displayName: "Tavern",
            x: "34%",
            y: "27%",
        },
        {
            id: 2,
            name: "Town Hall",
            displayName: "Town Hall",
            x: "49%",
            y: "38%",
        },
        {
            id: 3,
            name: "Alley",
            displayName: "???",
            x: "72%",
            y: "50%",
        },
        {
            id: 4,
            name: "Wizard Hut",
            displayName: "Wizard Hut",
            x: "61%",
            y: "76%",
        },
    ];

    const [hoveredHouse, setHoveredHouse] = useState<null | {
        id: number;
        name: string;
        displayName: string;
        description: string;
        x: string;
        y: string;
    }>(null);

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

    const houseDescriptions: { [key: string]: string } = {
        Tavern: "The Tavern is a place where you can trade with Mateo.",
        "Town Hall":
            "The Town Hall is a place where you embark on your next adventure.",
        "Wizard Hut":
            "The Wizard Hut is a place where you can buy spells and potions from Shippy.",
        Alley: "This is a mysterious place.",
    };
    return (
        <div>
            {houses.map((house) => (
                <div
                    key={house.id}
                    className="absolute w-[30px] h-[30px] bg-black opacity-90 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 hover:scale-125"
                    style={{ left: house.x, top: house.y }}
                    onClick={() =>
                        //navigacija na određenu kuću (ime kuće pretvoreno u lowercase i razmak zamijenjen s crticom)
                        navigate(
                            "/" + house.name.toLowerCase().replace(" ", "-")
                        )
                    }
                    onMouseEnter={() => {
                        const description = houseDescriptions[house.name];
                        if (description) {
                            setHoveredHouse({
                                ...house,
                                displayName: house.displayName,
                                description,
                            });
                        }
                    }}
                    onMouseLeave={() => setHoveredHouse(null)}
                />
            ))}
            {hoveredHouse && (
                <div
                    className="animate-fade-in-fast"
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

export default House;
