import React, { Component } from 'react';
import axios from 'axios';

class JokeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            joke: ''
        };

        this.fetchJoke();
    }

    fetchJoke = async () => {
        try {
            const response = await axios.get(`https://v2.jokeapi.dev/joke/${this.props.category}`);
            const newJoke = response.data.joke || (response.data.setup + ' ' + response.data.delivery);
            this.setState({ joke: newJoke });
        } catch (error) {
            console.error('Error fetching joke:', error);
        }
    };

    render() {
        const { joke } = this.state;

        return (
            <div style={{margin: "10px 0"}}>
                <h2>Joke of the Day</h2>
                {joke && <p>{joke}</p>}
            </div>
        );
    }
}

JokeComponent.defaultProps = {
    category: 'Any'
};

export default JokeComponent;
