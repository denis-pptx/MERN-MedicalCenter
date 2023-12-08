import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.module.css';
import AuthContext from '../../../context/AuthContext';

const Navbar = () => {
    const { isAuth } = useContext(AuthContext);

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
                    {isAuth &&
                        <li>
                            <Link to="/categories">Категории</Link>
                        </li>
                    }
                </div>

                <div>
                    {!isAuth &&
                        <li>
                            <Link to="/login">Войти</Link>
                        </li>
                    }
                    {!isAuth &&
                        <li>
                            <Link to="/register">Регистрация</Link>
                        </li>
                    }
                    {isAuth &&
                        <li>
                            <Link to="/logout">Выйти</Link>
                        </li>
                    }
                </div>
            </ul>
        </nav>
    );
};

export default Navbar;
