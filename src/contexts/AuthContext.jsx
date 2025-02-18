import { createContext, useState, useEffect } from "react";
import axios from "../configs/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        loading: true,
    });

    useEffect(() => {
        // Check for user data in localStorage on initial load
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);

            if (parsedUser.accessToken) {
                // Set the auth state if token exists
                setAuthState({
                    isAuthenticated: true,
                    user: parsedUser,
                    loading: false,
                });
            } else {
                setAuthState({
                    isAuthenticated: false,
                    user: null,
                    loading: false,
                });
            }
        } else {
            setAuthState({
                isAuthenticated: false,
                user: null,
                loading: false,
            });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", {
                email,
                password,
            });
            const { userData } = response.data;

            localStorage.setItem("user", JSON.stringify(userData));

            setAuthState({
                isAuthenticated: true,
                user: userData,
                loading: false,
            });

            return { success: true, message: response.data.message };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;