import React from 'react';
import './Header.css';
import bg from '../../assets/main_banner_bg.png'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate()
  return (

    <header
      className="header"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay" />
      <div className="header-content">
        <h1 className="header-title">Fresh, Organic & Delivered</h1>
        <p className="header-subtitle">
          Discover farm-fresh groceries delivered right to your doorstep.
        </p>
        <button onClick={()=>navigate('/product')} className="cta-btn">Start Shopping</button>
      </div>
    </header>
  );
};

export default Header;
