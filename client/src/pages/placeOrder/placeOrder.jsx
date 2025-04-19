import React, { useContext,useEffect, useState } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
  const { getTotalCartAmount, token, productList, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Place Order function
  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    productList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    console.log("order data : ",orderData);
    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirect to Stripe payment page
      } else {
        alert("Error: Order placement failed.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert(`Error: ${error.response?.data?.message || "Order failed"}`);
    }
  };

  const navigate = useNavigate()
  useEffect(() => {
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  }, [token]);
                                                              
  return (
    <form onSubmit={placeOrder} className='place-order' id='order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>

        <div className="multi-field">
          <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' required />
          <input name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last name' required />
        </div>

        <input name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' required />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />

        <div className="multi-field">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' required />
        </div>
        <div className="multi-field">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
          <input name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' required />
        </div>
        <input name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' required />
      </div>

      <div className="place-order-right">
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
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
