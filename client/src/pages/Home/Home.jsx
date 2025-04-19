import React, { useState } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import Categories from '../../components/Categories/Categories';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import Navbar from '../../components/Navbar/Navbar';
import BestSeller from '../../components/BestSeller/BestSeller';

const Home = () => {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={`home-container ${showLogin ? 'blur-background' : ''}`}>
      {/* <Navbar setShowLogin={setShowLogin} /> */}
      <Header />
      <Categories category={category} setCategory={setCategory} />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <BestSeller/>
    </div>
  );
};

export default Home;
