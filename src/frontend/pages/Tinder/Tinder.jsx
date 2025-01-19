import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TinderCard from '../../components/TinderCard/TinderCard';
import './Tinder.css';

function Tinder() {
    const [cards, setCards] = useState([]);
    const [interestedCompanies, setInterestedCompanies] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/data')
            .then((response) => {
                const transformedData = response.data.map((item, index) => ({
                    id: index,
                    image: 'https://via.placeholder.com/150',
                    color: '#228B22',
                    name: item.name,
                    text: `${item.name} - ${item.price}: ${item.description}`,
                }));
                setCards(transformedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSwipeRight = (card) => {
        setInterestedCompanies((prev) => [...prev, card]);
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
                            onSwipeRight={() => handleSwipeRight(card)}
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
