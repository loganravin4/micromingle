import React, { useEffect, useState } from 'react';
import './UserDashboard.css';

function UserDashboard() {
  const [investableMoney, setInvestableMoney] = useState(null);
  const [moneyInPortfolio, setMoneyInPortfolio] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {

    setInvestableMoney(5000);
    setMoneyInPortfolio(12000);

    setTransactionHistory([
      { date: '2025-01-16', description: 'Stock Purchase - AAPL', amount: 500 },
      { date: '2025-01-15', description: 'Dividend Payout', amount: 200 },
    ]);
  }, []); 

  const investNow = () => {
    window.location.href = '/Invest';
  };
   
  return (
    <div className="container">
      <h1 className="page-title">Portfolio Overview</h1>

      <div className="content">
        {/* Left section */}
        <div className="top-left">
          <div>
            <strong>Investable Money:</strong> ${investableMoney}
            <button onClick={investNow} className="invest-button">Invest</button>
          </div>
          <div>
            <strong>Money in Portfolio:</strong> ${moneyInPortfolio}
          </div>
          <div>
            <strong>Transaction History:</strong>
            <ul className="transaction-list">
              {transactionHistory.length > 0 ? (
                transactionHistory.map((transaction, index) => (
                  <li key={index} className="transaction-item">
                    <span>{transaction.date}: </span>
                    <span>{transaction.description}</span>
                    <span> - ${transaction.amount}</span>
                  </li>
                ))
              ) : (
                <p>No transactions available</p>
              )}
            </ul>
          </div>
        </div>
t
        {/* Right section */}
        <div className="tracking-section">
          <h2>Tracking Your Portfolio</h2>
          <p>See how your investments are doing so far!</p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
 