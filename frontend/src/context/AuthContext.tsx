import { createContext, useContext, useState } from "react";
import axios from "axios";

// Define the user type
export interface User {
    id: string;
    username: string;
    email: string;
    xp: number;
    coins: number;
}

// Define the authentication context type
interface AuthContextType {
    user: User | null;
    login: (emailUsername: string, password: string) => Promise<void>;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Create context with undefined to enforce usage within a provider
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (emailUsername: string, password: string) => {
        try {
            const response = await axios.post(
                "https://localhost:7092/api/auth/login",
                { emailUsername: emailUsername, password: password },
                { withCredentials: true }
            );

            const userData = response.data; // Get basic user info
            console.log(userData);
            setUser(userData);
        } catch (error) {
            console.error("Login failed", error);
            throw new Error("Invalid credentials");
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook for using AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
