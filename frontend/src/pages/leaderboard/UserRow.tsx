import React from "react";

interface UserProps {
    index: number;
    username: string;
    coins: number;
    xp: number;
}

const getRankingColor = (index: number) => {
    if (index === 0) return "text-yellow-400"; //Zlatno za 1. mjesto
    if (index === 1) return "text-gray-300"; //Srebrno za 2. mjesto
    if (index === 2) return "text-orange-400"; //Brončano za 3. mjesto
    return "text-white"; // Ostali bijeli
};

const UserRow: React.FC<UserProps> = ({ index, username, coins, xp }) => {
    return (
        <li className="flex items-center bg-black bg-opacity-50 m-2 p-2 w-full">
            <span
                className={`w-1/3 text-left text-white pl-10 ${getRankingColor(
                    index
                )}`}
            >
                {index + 1} &nbsp;&nbsp;&nbsp; {username}
            </span>
            <span className="w-1/3 flex text-left">
                <span className="text-white">Coins: </span>
                <span className="text-red-500 ml-2">{coins}</span>
            </span>
            <span className="w-1/3 flex text-left">
                <span className="text-white">XP: </span>
                <span className="text-blue-300 ml-2">{xp}</span>
            </span>
        </li>
    );
};

export default UserRow;
