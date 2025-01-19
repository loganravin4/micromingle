import React from 'react'
import TinderCard from '../../components/TinderCard/TinderCard';
import './Tinder.css';

function Tinder() {
    const cards = [
        { id: 1, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#55ccff', text: 'Small Cap Company 1' },
        { id: 2, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#e8e8e8', text: 'Small Cap Company 2' },
        { id: 3, image: 'https://img.icons8.com/color/452/GeeksforGeeks.png', color: '#0a043c', text: 'Small Cap Company 3' },
    ];
  return (
    <div>
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
  )
}

export default Tinder