import React from 'react';
import WeatherComponent from '../components/WeatherComponent';
import JokeComponent from '../components/JokeComponent';
import '../styles/App.css'
import banner from '../images/banner.png'
import Block from '../components/UI/Block/Block';

const Home = () => {
    return (
        <div class="page">

            <div className="banner-container">

                <div className="banner">
                    <a href="https://www.bsuir.by/" target="_blank">
                        <img className="banner-image" src={banner} alt="Banner" />
                    </a>
                </div>
            </div>

            <Block>
                <WeatherComponent />
                <JokeComponent />
            </Block>
        </div>
    );
};

export default Home;
