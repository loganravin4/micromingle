import React, { useEffect, useState } from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './homepage.css';

function Homepage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5173/api/data')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 class="specialHeader"> MicroMingle</h1>
      <div class="card">
        
        <p>
          MicroMingle is a website used to allow people to round up their spendings and then invest that excess cash 
          in small cap companies. Small-cap businesses can also then register here and pitch their business to the 
          population to 

        </p>
        
      </div>
    );
  }
  
  export default Homepage;
  

  