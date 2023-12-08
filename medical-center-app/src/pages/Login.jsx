import React, { useContext, useState } from 'react';
import $api from '../http/index';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { setIsAuth } = useContext(AuthContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await $api.post('/auth/login', { login, password });
            const { token } = response.data;

            localStorage.setItem('token', token);
            setIsAuth(true);
            navigate('/');
        } catch (error) {
            alert(`SERVER: ${error.response.data.error}`)
            console.error('Authorization error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>Login:</label>
                <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};

export default Login;