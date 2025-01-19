import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './homepage.css';

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
              <Link to="/dashboard">
                <button onClick={() => console.log('Navigate to login')}>Login</button>
              </Link>
              <Link to="/dashboard">
                <button onClick={() => console.log('Navigate to sign up')}>Sign up</button>
              </Link>
                
                <p className="read-the-docs">Welcome to MicroMingle!</p>
            </div>
        </div>
    );
}

export default Homepage;
