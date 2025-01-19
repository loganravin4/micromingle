import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TinderCard from '../../components/TinderCard/TinderCard';
import './Tinder.css';

function Tinder() {
    const [cards, setCards] = useState([]); // State to hold cards data
    const [interestedCompanies, setInterestedCompanies] = useState([]); // State for interested companies

    // Fetch data from the backend using axios
    useEffect(() => {
        axios
            .get('http://localhost:5000/api/data') // Assuming your backend is running on the same origin
            .then((response) => {
                // Transform the fetched data if necessary
                const transformedData = response.data.map((item, index) => ({
                    id: index,
                    image: 'https://via.placeholder.com/150', // Default placeholder image
                    color: '#228B22', // Default background color
                    name: item.name, // Separate name for displaying
                    text: `${item.name} - ${item.price}: ${item.description}`, // Use backend data
                }));
                setCards(transformedData); // Update state with transformed data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    // Function to handle swiping right
    const handleSwipeRight = (card) => {
        setInterestedCompanies((prev) => [...prev, card]); // Add card to the interested companies list
    };

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
                            onSwipeRight={() => handleSwipeRight(card)} // Pass the swipe right handler
                        />
                    ))}
                </div>
            </div>
            <div className="interested-companies-section">
                <h3>Interested Companies:</h3>
                <ul>
                    {interestedCompanies.map((company, index) => (
                        <li key={index}>{company.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Tinder;
