import React from "react";
import { useNavigate } from "react-router-dom";

const Leaderboard: React.FC = () => {
    const navigate = useNavigate();
    const backgroundStyle: React.CSSProperties = {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0px",
        top: "0px",
        backgroundImage: "url(src/assets/images/leaderboard-backdrop.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };
    return (
        <div style={backgroundStyle} className="overflow-hidden font-pixel">
            <button
                style={{
                    backgroundColor: "white",
                }}
                onClick={() => navigate("/map")}
            >
                Back
            </button>
            <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
                <div className="w-3/4 h-100% bg-black bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center -mt-5">
                    <h1 className="text-7xl font-bold text-white mb-4 mt-8 items-left">
                        LEADERBOARD
                    </h1>
                    <ul className="text-white text-3xl w-full text-left">
                        <li className="flex justify-between items-center text-yellow-500 bg-black bg-opacity-50 m-2 p-2 pl-40 pr-10">
                            {/* Ime igrača - poravnat na početak */}
                            <span className="text-left w-1/3">pjevv</span>

                            {/* XP i Coins u istom redu, poravnati na početak */}
                            <span className="w-1/3 flex gap-x-8 text-left">
                                {/* Coins */}
                                <span className="flex">
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 ml-2">
                                        130
                                    </span>
                                </span>

                                {/* XP */}
                                <span className="flex">
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 ml-2">
                                        600
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center text-yellow-500 bg-black bg-opacity-50 m-2 p-2 pl-40 pr-10">
                            <span>Matej2405</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        120
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        570
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center text-yellow-500 bg-black bg-opacity-50 m-2 p-2 pl-40 pr-10">
                            <span>MateoS</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        260
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        548
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>gobliN</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        1479
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        547
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>Player44</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        44
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        499
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>bestEver</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        99
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        447
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>nigga</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        852
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        384
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>ideGas999</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        3
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        232
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>skibidiHiljson</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        342
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        130
                                    </span>
                                </span>
                            </span>
                        </li>
                        <li className="flex justify-between items-center bg-black bg-opacity-20 m-2 p-2 pl-40 pr-10">
                            <span>mihael_glavicicic</span>
                            <span className="flex gap-x-8">
                                <span>
                                    <span className="text-white">Coins: </span>
                                    <span className="text-red-500 pr-20">
                                        0
                                    </span>
                                </span>
                                <span>
                                    <span className="text-white">XP: </span>
                                    <span className="text-blue-300 pr-20">
                                        2
                                    </span>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
