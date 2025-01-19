import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';
import TinderCard from './components/TinderCard/TinderCard';

function Homepage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/data')
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const cards = [
        { id: 1, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#55ccff', text: 'Small Cap Company 1' },
        { id: 2, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#e8e8e8', text: 'Small Cap Company 2' },
        { id: 3, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#0a043c', text: 'Small Cap Company 3' },
    ];

    return (
        <div className="container">
            <div className="left-side">
                <h1 className="specialHeader">MicroMingle</h1>
                <div className="card">
                    <p>
                        MicroMingle is a website used to allow people to round up their spendings and then invest that excess cash 
                        in small cap companies. Small-cap businesses can also then register here and pitch their business to the 
                        population to get people who would like to invest. This is so that people who do not know much about investing 
                        could still invest and learn about companies that they would not have thought about before.
                    </p>
                </div>
            </div>
            <div className="right-side">
                <button onClick={() => console.log('Navigate to login')}>Login</button>
                <button onClick={() => console.log('Navigate to sign up')}>Sign up</button>
                <p className="read-the-docs">Welcome to MicroMingle!</p>
            </div>
            <div className="cards-section">
                <h2>Discover Small Cap Companies</h2>
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <TinderCard
                            key={card.id}
                            image={card.image}
                            color={card.color}
                            text={card.text}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage;
