import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { token, setToken, getCartItemCount } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleHamburger = () => setIsOpen(!isOpen);
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className='navbar'>
      <Link to='/'>
        <img src={assets.logo2} alt='logo' className='logo' />
      </Link>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleHamburger}>
        <div className='bar'></div>
        <div className='bar'></div>
        <div className='bar'></div>
      </div>

      <ul className={`navbar-menu ${isOpen ? 'show' : ''}`}>
        <Link to='/' onClick={() => { setMenu('home'); setIsOpen(false); }} className={isActive('/') ? 'active' : ''}>Home</Link>
        <Link to='/product' onClick={() => { setMenu('product'); setIsOpen(false); }} className={isActive('/product') ? 'active' : ''}>All Product</Link>
      </ul>

      <span className='search-bar'>
        <input type='text' name='search' placeholder='Search...' />
        <img src={assets.search_icon} alt='search' />
      </span>

      <div className='navbar-right-section'>
        <Link
          to='/myorders'
          className={`navbar-orders-icon ${isActive('/myorders') ? 'highlight' : ''}`}
        >
          My Orders
        </Link>

        <Link to='/cart' className='navbar-cart-icon'>
          <img src={assets.cart_icon} alt='cart' />
          {getCartItemCount() > 0 && (
            <span className='cart-count-badge'>{getCartItemCount()}</span>
          )}
        </Link>



        {!token ? (
          <button onClick={() => setShowLogin(true)} className='btn'>Sign up</button>
        ) : (
          <div className='navbar-profile' ref={dropdownRef}>
            <img
              src={assets.profile_icon}
              alt='profile'
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className='profile-icon full-circle'
            />
            <ul className={`navbar-profile-dropdown ${dropdownVisible ? 'show' : ''}`}>
              <li onClick={() => { logout(); setDropdownVisible(false); }}>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
