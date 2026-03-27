import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('rc_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Initialize Mock DB
    useEffect(() => {
        const usersDB = localStorage.getItem('rc_users_db');
        if (!usersDB) {
            const initialDB = [
                { email: 'pumatadeo@gmail.com', password: '123456=123', role: 'admin', name: 'Alejandro Espinosa' }
            ];
            localStorage.setItem('rc_users_db', JSON.stringify(initialDB));
        }
        
        const logsDB = localStorage.getItem('rc_access_logs');
        if (!logsDB) {
            localStorage.setItem('rc_access_logs', JSON.stringify([]));
        }
    }, []);

    const logAccess = (email) => {
        const logs = JSON.parse(localStorage.getItem('rc_access_logs') || '[]');
        logs.unshift({
            id: Date.now(),
            email: email,
            date: new Date().toLocaleString('es-ES')
        });
        localStorage.setItem('rc_access_logs', JSON.stringify(logs));
    };

    const login = (email, password) => {
        const usersDB = JSON.parse(localStorage.getItem('rc_users_db') || '[]');
        const foundUser = usersDB.find(u => u.email === email && u.password === password);

        if (foundUser) {
            const loggedUser = { email: foundUser.email, role: foundUser.role, name: foundUser.name };
            setUser(loggedUser);
            localStorage.setItem('rc_user', JSON.stringify(loggedUser));
            
            // Record access log
            logAccess(foundUser.email);
            
            return { success: true, isAdmin: foundUser.role === 'admin' };
        }
        
        return { success: false, message: 'Credenciales inválidas' };
    };

    const register = (email, password) => {
        const usersDB = JSON.parse(localStorage.getItem('rc_users_db') || '[]');
        if (usersDB.find(u => u.email === email)) {
            return { success: false, message: 'El correo ya está registrado' };
        }

        const newUser = { email, password, role: 'user', name: email.split('@')[0] };
        usersDB.push(newUser);
        localStorage.setItem('rc_users_db', JSON.stringify(usersDB));
        
        return login(email, password); // Auto login after register
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('rc_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
