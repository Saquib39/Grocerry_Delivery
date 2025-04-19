import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';

const ProductDetail = () => {
  const { productList, url } = useContext(StoreContext); // <-- Include url from context
  const navigate = useNavigate();
  const { category, id } = useParams();
  const product = productList.find(item => item._id === id);
  const { addToCart } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(product?.images[0] || ''); // Set the 0th index image as default

  // Related Products (same category, excluding current product)
  const relatedProducts = productList.filter(item =>
    item.category.toLowerCase() === category.toLowerCase() && item._id !== id
  );

  useEffect(() => {
    // Reset the selectedImage when the product changes
    if (product) {
      setSelectedImage(product.images[0]); // Default to 0th image
    }
  }, [product]);

  if (!product) {
    return <p style={{ textAlign: 'center' }}>Product not found.</p>;
  }

  return (
    <div className="product-detail-container">
      <div className='continue'>
        <Link to={"/product"} style={{display:'flex'}}>
        <img src={assets.arrow_right_icon_colored} alt="" />
        <p>Continue Shopping</p>
        </Link>
      </div>
      <div className="top-section">
        {/* LEFT: Image Gallery */}
        <div className="image-gallery">
          
          <div className="main-image">
            <img src={url + "/images/" + selectedImage} alt="Main" /> {/* Fixed image source */}
          </div>
          <div className="thumbnail-container">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={url + "/images/" + img} // <-- Prefix URL here as well
                alt={`thumb-${index}`}
                className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                onClick={() => setSelectedImage(img)} // On click, update selected image
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className='offerPrice'><strong>MRP:</strong> ₹{product.originalPrice}</p>
          <p><strong>Offer Price:</strong> ₹{product.offerPrice}</p>
          <div className="description">
            <strong>About Product:</strong>
            <ul>
              <li>{product.description}</li>
              <li>{product.description}</li>
              <li>{product.description}</li>
            </ul>
          </div>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.inStock ? "In Stock" : "Out of Stock"}</p>

          <div className="buttons-container">
            <button onClick={() => addToCart(id)} className="button2">Add to Cart</button>
            <button onClick={() => navigate('/cart')} className="button">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3>Related Products</h3>
          <div className="related-products-list">
            {relatedProducts.map(item => (
              <Link to={`/product/${item.category.toLowerCase()}/${item._id}`} key={item._id}>
                <div className="related-item">
                  <img src={url + "/images/" + item.images[0]} alt={item.name} /> {/* Fixed image source */}
                  <p>{item.name}</p>
                  <p>₹{item.offerPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No related products found.</p>
      )}
    </div>
  );
};

export default ProductDetail;
