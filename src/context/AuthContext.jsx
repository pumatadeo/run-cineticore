import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('rc_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Mock authentication based on requirements
        if (email === 'pumatadeo@gmail.com' && password === '123456=123') {
            const adminUser = { email, role: 'admin', name: 'Alejandro Espinosa' };
            setUser(adminUser);
            localStorage.setItem('rc_user', JSON.stringify(adminUser));
            return { success: true, isAdmin: true };
        } else {
            // General user login mock
            const normalUser = { email, role: 'user', name: email.split('@')[0] };
            setUser(normalUser);
            localStorage.setItem('rc_user', JSON.stringify(normalUser));
            return { success: true, isAdmin: false };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('rc_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
