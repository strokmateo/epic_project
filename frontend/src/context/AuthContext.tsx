    import { createContext, useContext, useState, useEffect } from "react";
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
        login: (email: string, password: string) => Promise<void>;
        logout: () => void;
    }

    // Create context with undefined to enforce usage within a provider
    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    // Provider Component
    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            // Auto-login if token exists in local storage
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        }, []);

        useEffect(() => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }

            // Listen for storage updates (if another tab updates localStorage)
            const handleStorageChange = () => {
                const updatedUser = localStorage.getItem("user");
                if (updatedUser) {
                    setUser(JSON.parse(updatedUser));
                }
            };

            window.addEventListener("storage", handleStorageChange);
            return () => window.removeEventListener("storage", handleStorageChange);
        }, []);

        const login = async (email: string, password: string) => {
            try {
                const response = await axios.post(
                    "https://localhost:7092/api/auth/login",
                    { emailUsername: email, password: password }
                );

                const userData = response.data; // Get basic user info
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } catch (error) {
                console.error("Login failed", error);
                throw new Error("Invalid credentials");
            }
        };

        const logout = () => {
            setUser(null);
            localStorage.removeItem("user");
        };

        return (
            <AuthContext.Provider value={{ user, login, logout }}>
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
