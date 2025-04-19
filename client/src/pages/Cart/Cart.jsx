import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
// const [promo, setPromo] = useState(false);
import { assets } from '../../assets/assets';
// import { dummyProducts } from '../../assets/assets';
const Cart = () => {
  const { cartItems, productList,removeFromCart, getTotalCartAmount,promo,setPromo ,url} = useContext(StoreContext);
  const navigate = useNavigate()
  // const [promo,setPromo] = useState(false)
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {productList.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                <img src={url + "/images/"+item.images[0]} alt="" />
                  <p>{item.name}</p>
                  <p>${item.offerPrice}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.offerPrice* cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                </div>
                <hr />
              </div>
            )
          }
        })}

      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {
                promo? <p>${getTotalCartAmount()===0?0:0}</p>: <p>${getTotalCartAmount()===0?0:2}</p>
              }
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              
              {
                promo?getTotalCartAmount():<b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              }
            </div>
            <hr />
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' className='promo' required />
              <button onClick={()=>setPromo(true)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
