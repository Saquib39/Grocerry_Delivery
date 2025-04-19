import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDisplay.css';
import ProductItem from '../ProductItem/ProductItem';
import { StoreContext } from '../../context/StoreContext';

const ProductDisplay = () => {
  const { category } = useParams(); // <-- grab the category from URL
  const { productList, url } = useContext(StoreContext); // <-- Include url from context
  // If category exists, filter products accordingly
  const filteredProducts = category
    ? productList.filter(item => item.category.toLowerCase() === category.toLowerCase())
    : productList;

  return (
    <div>
      <h2 className='ProductPageTitle'>{category ? category + " Products" : "All Products"}</h2>
      <div className='display_product'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, index) => (
            <Link
              to={`/product/${item.category.toLowerCase()}/${item._id}`}
              key={index}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ProductItem
                id={item._id}
                name={item.name}
                images={item.images[0]}
                originalPrice={item.originalPrice}
                offerPrice={item.offerPrice}
                category={item.category}
                url={url} // <-- Pass url here
              />
            </Link>
          ))
        ) : (
          <p className='ProductPageFooter'>No products found in this category.</p>
        )}
      </div>
      {!category && <p className='ProductPageFooter'>Explore more categories coming soon!</p>}
    </div>
  );
};

export default ProductDisplay;
