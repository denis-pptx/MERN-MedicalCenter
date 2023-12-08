import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import AuthContext from '../../../context/AuthContext';

const Navbar = () => {
    const { isAuth } = useContext(AuthContext);

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const date = new Date().toLocaleString(undefined, dateOptions); // und - локаль

    return (
        <nav>
            <ul>
                <div>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/about">О нас</Link>
                    </li>
                    <li>
                        <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                        <Link to="/services">Услуги</Link>
                    </li>
                    {isAuth && (
                        <>
                            <li>
                                <Link to="/categories">Категории</Link>
                            </li>
                            <li>
                                <Link to="/orders">Заказы</Link>
                            </li>
                        </>
                    )}
                </div>

                <div style={{color: "white"}}>
                    <li>
                        {userTimezone}
                    </li>
                    <li>
                        {date}
                    </li>
                </div>

                <div>
                    {!isAuth && (
                        <>
                            <li>
                                <Link to="/login">Войти</Link>
                            </li>
                            <li>
                                <Link to="/register">Регистрация</Link>
                            </li>
                        </>
                    )}

                    {isAuth && (
                        <li>
                            <Link to="/logout">Выйти</Link>
                        </li>
                    )}
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
