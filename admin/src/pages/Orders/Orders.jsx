import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../../../client/src/assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      });

      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="order-list">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} className='order-item'>
                
                {/* Images for all items */}
                <div className="order-item-images" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {order.items?.map((item, idx) => (
                    <img
                      key={idx}
                      src={`${url}/uploads/${item.images?.[0]}`}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ddd"
                      }}
                      onError={(e) => { e.target.src = assets.defaultFoodImage }}
                    />
                  ))}
                </div>

                <div>
                  <p className='order-item-food'>
                    {order.items?.map((item, idx) => (
                      idx === order.items.length - 1
                        ? `${item.name} x ${item.quantity}`
                        : `${item.name} x ${item.quantity}, `
                    )) || "No items available"}
                  </p>
                  <p className='order-item-name'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <div className="order-item-address">
                    <p>{order.address.street},</p>
                    <p>
                      {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                    </p>
                  </div>
                  <p className="order-item-phone">{order.address.phone}</p>
                </div>

                <p>Items: {order.items.length}</p>
                <p>${order.amount}</p>

                <p className="order-status">
                  {(order.status === "Canceled" || order.status === "Delivered") ? (
                    order.status === "Canceled" ? "Order Canceled" : "Delivered"
                  ) : (
                    <select
                      onChange={(event) => statusHandler(event, order._id)}
                      value={order.status}
                    >
                      <option value="Food Processing">Food Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  )}
                </p>
                {console.log(order)}
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
