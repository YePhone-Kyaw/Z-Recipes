import { createContext, useState, type ReactNode } from "react";

type User = {
    id : string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    login: (user : User) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children } : { children : ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const login = (userData : User) => {
        setUser(userData);
    }
    const logout = () => {
        setUser(null);
    }
    const value = {
        user,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthContextProvider };