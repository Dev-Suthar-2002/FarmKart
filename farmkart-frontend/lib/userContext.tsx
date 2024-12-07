'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    _id: string;
    email: string;
    name: string;
    role: 'customer' | 'farmer'; // or use Role enum if you have defined it in TypeScript
    phone?: string;
    address?: string;
    bio?: string; // Add other properties as necessary
}

interface UserContextType {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User | null) => void;
    setAccessToken: (token: string | null) => void;
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('access_token');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        if (token) {
            setAccessToken(token);
        }
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        localStorage.removeItem('expiration_time');
    }

    return (
        <UserContext.Provider value={{ user, accessToken, setUser, setAccessToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};