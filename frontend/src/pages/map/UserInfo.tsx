import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth, User } from "../../context/AuthContext";
import axios from "axios";

const UserInfo: React.FC = () => {
    const { user, login } = useAuth();

    const [fullUser, setFullUser] = useState<User | null>(user);

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

    return (
        <div>
            {fullUser ? (
                <div className="absolute top-0 left-0 bg-black w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">User: {fullUser.username}</p>
                    <p className="text-white pl-2">Xp: {fullUser.xp}</p>{" "}
                    <p className="text-white pl-2">Coins: {fullUser.coins}</p>{" "}
                </div>
            ) : (
                <div className="absolute top-0 left-0 bg-black w-[250px] h-[100px] z-50 opacity-80 rounded-sm mt-2 ml-2 flex flex-col justify-around py-2">
                    <p className="text-white pl-2">Loading user info...</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
