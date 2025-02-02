import React, { useEffect, useState } from "react";
import UserRow from "./UserRow";

interface User {
    userId: string;
    username: string;
    coins: number;
    xp: number;
}

const Board: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(
                    "https://localhost:7092/api/leaderboard"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch leaderboard");
                }
                const data = await response.json();
                console.log("Fetched data:", data);

                // Provjera da data ima očekivanu strukturu
                if (!data.entries || !Array.isArray(data.entries)) {
                    throw new Error(
                        "Invalid JSON format: Missing 'entries' array"
                    );
                }

                setUsers(data.entries); // Postavi samo entries array
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return (
        <div>
            <div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat">
                <div className="w-3/4 h-100% bg-black bg-opacity-50 rounded-xl shadow-lg flex flex-col items-center -mt-5">
                    <h1 className="text-7xl font-bold text-white mb-4 mt-8 items-left">
                        LEADERBOARD
                    </h1>

                    {loading ? (
                        <p className="text-white text-3xl">Loading...</p>
                    ) : (
                        <ul className="text-white text-3xl w-full text-left">
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <UserRow
                                        key={user.userId}
                                        index={index}
                                        username={user.username}
                                        coins={user.coins}
                                        xp={user.xp}
                                    />
                                ))
                            ) : (
                                <p className="text-white text-2xl">
                                    No users found.
                                </p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Board;
