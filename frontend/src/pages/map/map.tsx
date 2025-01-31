import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "../../context/AuthContext";
import axios from "axios";

const Map: React.FC = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth();
    const [fullUser, setFullUser] = useState<User | null>(user);

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

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (user?.email) {
                try {
                    const response = await axios.get(
                        `https://localhost:7092/api/user/current?email=${encodeURIComponent(
                            user.email
                        )}`
                    );
                    setFullUser(response.data); // Update with full user info
                    console.log(response.data);
                } catch (error) {
                    console.error("Failed to fetch user details", error);
                }
            }
        };

        fetchUserDetails();
    }, [user]); // Runs when `user` updates

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
        opacity: 0.9,
        borderRadius: "50%",
        border: "2px solid white",
        cursor: "pointer",
    };

    //hover style
    const infoHoverStyle: React.CSSProperties = {
        position: "absolute",
        backgroundColor: "black",
        color: "white",
        // opacity: 0.4,
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
            {fullUser ? (
                <div className="absolute top-0 left-0 bg-black w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">User: {fullUser.username}</p>
                    <p className="text-white pl-2">Xp: {fullUser.xp}</p>{" "}
                    {/* Match lowercase */}
                    <p className="text-white pl-2">
                        Coins: {fullUser.coins}
                    </p>{" "}
                    {/* Match lowercase */}
                </div>
            ) : (
                <div className="absolute top-0 left-0 bg-black w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">Loading user info...</p>
                </div>
            )}

            {houses.map((house) => (
                <div
                    //slika nije kako treba jer nemam photoshop na laptopu - photopea šteka jako (promijeniti)
                    //div pretvoriti u img kad se napravi ikonica kako spada, za sad neka je točkica
                    //src="src/assets/images/houses_icon_bg.png"

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

export default Map;
