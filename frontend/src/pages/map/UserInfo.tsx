import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const UserInfo: React.FC = () => {
    const { user, setUser } = useAuth();

    const fetchUserByEmail = async (email: string) => {
        try {
            const response = await axios.get(
                "https://localhost:7092/api/user/current",
                {
                    params: { email },
                }
            );

            console.log(response);
            return response;
        } catch (error) {
            console.error("Error fetching user:\n", error);
        }
    };

    useEffect(() => {
        if (!user) throw new Error("User must be defined before entering map.");

        const getUserData = async () => {
            const userData = await fetchUserByEmail(user.email);
            setUser(userData?.data);
        };

        getUserData();
    }, []);

    return (
        <div>
            {user ? (
                <div className="absolute top-0 left-0 bg-black w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">User: {user.username}</p>
                    <p className="text-white pl-2">Xp: {user.xp}</p>{" "}
                    <p className="text-white pl-2">Coins: {user.coins}</p>{" "}
                </div>
            ) : (
                <div className="absolute top-0 left-0 bg-bslack w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">Loading user info...</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
