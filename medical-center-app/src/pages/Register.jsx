import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyInput from '../components/UI/Inputs/MyInput';
import MyButton from '../components/UI/button/MyButton';
import $api from '../http/index';


const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
    });


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await $api.post('/auth/register', formData);
            alert('Успешная регистрация!')
            navigate('/login');
        } catch (error) {
            alert(`SERVER: ${error.response.data.message}`);
            console.error('Registration error:', error);
        }
    };

    return (
        <div class="loginContainer">
            <div class="loginForm">
                <h2>Регистрация</h2>
                <br></br>

                <form>
                    <div class="form-group">
                        <h3>Логин</h3>
                        <MyInput
                            type="text"
                            value={formData.login}
                            onChange={(e) => setFormData({...formData, login: e.target.value})}
                        />
                    </div>

                    <div class="form-group">
                        <h3>Почта</h3>
                        <MyInput
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div class="form-group">
                        <h3>Пароль</h3>
                        <MyInput
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                    </div>

                    <MyButton onClick={handleRegister}>Зарегистрироваться</MyButton>
                </form>
            </div>
        </div>
    );
};

export default Registration;