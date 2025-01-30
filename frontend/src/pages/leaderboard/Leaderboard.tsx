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
        <div
            style={backgroundStyle}
            className="animate-fade-in overflow-hidden font-pixel"
        >
            <button
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    width: "150px",
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    height: "50px",
                    borderRadius: "10px",
                    zIndex: 40,
                }}
                onClick={() => navigate("/town-hall")}
            >
                Back
            </button>
            <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
                <div className="w-3/4 h-100% bg-black bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center -mt-5">
                    <h1 className="text-7xl font-bold text-white mb-4 mt-8 items-left">
                        LEADERBOARD
                    </h1>
                    <ul className="text-white text-3xl w-full text-left">
                        <li className="flex items-center bg-black bg-opacity-50 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-yellow-500 pl-10">
                                pjevv
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">130</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">1272</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-50 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-gray-400 pl-10">
                                Matej240PET
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">120</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">597</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-50 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-yellow-700 pl-10">
                                MateoS
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">260</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">548</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                gobliN
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">1479</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">544</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                Player44
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">44</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">499</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                bestEver
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">327</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">446</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                SwiftieEnjoyer77
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">332</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">399</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                ideGas999
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">3</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">232</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                skibidiHiljson
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">900</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">224</span>
                            </span>
                        </li>
                        <li className="flex items-center bg-black bg-opacity-20 m-2 p-2 w-full">
                            <span className="w-1/3 text-left text-white pl-10">
                                mihael_glavicicic
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">Coins: </span>
                                <span className="text-red-500 ml-2">0</span>
                            </span>
                            <span className="w-1/3 flex text-left">
                                <span className="text-white">XP: </span>
                                <span className="text-blue-300 ml-2">2</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
