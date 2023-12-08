import React, { Component } from 'react';
import axios from 'axios';

class WeatherComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: null
        };

        this.fetchData();
    }

    fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.props.city}&units=metric&appid=aed8fb007394a58f1b4ad89ee08fc49e`);
            this.setState({ weatherData: response.data });
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    render() {
        const { weatherData } = this.state;

        return (
            <div>
                {weatherData &&
                    <div>
                        {this.props.city}, {weatherData.weather[0].description}, {weatherData.main.temp}°C
                    </div>
                }
            </div>
        );
    }
}

WeatherComponent.defaultProps = {
    city: 'Minsk'
};

export default WeatherComponent;
