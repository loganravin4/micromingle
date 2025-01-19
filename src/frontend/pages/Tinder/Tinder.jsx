import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TinderCard from '../../components/TinderCard/TinderCard';
import './Tinder.css';

function Tinder() {
    const [cards, setCards] = useState([]); // State to hold cards data

    // Fetch data from the backend using axios
    useEffect(() => {
        axios
            .get('/api/data') // Assuming your backend is running on the same origin
            .then((response) => {
                // Transform the fetched data if necessary
                const transformedData = response.data.map((item, index) => ({
                    id: index,
                    image: 'https://via.placeholder.com/150', // Default placeholder image
                    color: '#55ccff', // Default background color
                    text: `${item.name} - ${item.price}: ${item.description}`, // Use backend data
                }));
                setCards(transformedData); // Update state with transformed data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div className="cards-section">
                <h2>Discover Small Cap Companies</h2>
                <div className="cards-container">
                    {cards.map((card) => (
                        <TinderCard
                            key={card.id}
                            image={card.image}
                            color={card.color}
                            text={card.text}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tinder;
