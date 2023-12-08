import React, { useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext'

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

