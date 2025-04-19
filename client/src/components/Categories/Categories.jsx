import React from 'react';
import './Categories.css';
import { Link } from 'react-router-dom';
import { categories } from '../../assets/assets';

const Categories = ({ setCategory }) => {
  return (
    <div>
      <h1>Categories</h1>
      <div className="explore-categories">
        {categories.map((item, index) => (
          <Link to={`/product/${item.path.toLowerCase()}`} key={index}>
            <div
              onClick={() => setCategory(item.text)} // Use setCategory here
              style={{ backgroundColor: item.bgColor }}
              className="explore-menu-listitem"
            >
              <img src={item.image} alt={item.text} />
              <p>{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
