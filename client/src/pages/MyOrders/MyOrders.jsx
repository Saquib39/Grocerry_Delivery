import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        if (!token) return;
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error.response?.data || error.message);
        }
    };

    const cancelOrder = async (orderId) => {
        try {
            const response = await axios.post(
                `${url}/api/order/cancel`,
                { orderId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data.success) {
                alert("Order canceled successfully!");
                fetchOrders();
            } else {
                alert(response.data.message || "Failed to cancel the order");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Failed to cancel the order, please try again later.");
        }
    };

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="order-header">
                <div>Product</div>
                <div>Status / Quantity</div>
                <div>Amount</div>
            </div>
            {data.map((order, index) => (
                <div key={index} className="order-block">
                    {order.items.map((item, itemIndex) => (
                        <div className="order-row" key={itemIndex}>
                            <div className="order-product">
                                <img
                                    src={`${url}/uploads/${item.images[0]}`}
                                    alt={item.name}
                                    onError={(e) => { e.target.src = assets.defaultFoodImage; }}
                                />
                                <div className="product-details">
                                    <p className="product-name">{item.name}</p>
                                    <p className="product-category">{item.category}</p>
                                </div>
                            </div>
                            <div className="order-status">
                                <p>Qty: {item.quantity}</p>
                                <p className={`status-dot ${order.status.toLowerCase()}`}>{order.status}</p>
                            </div>
                            <div className="order-amount">
                                ${((item.offerPrice || item.price) * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                    {order.status !== "Delivered" && (
                        <button className="cancel-btn" onClick={() => cancelOrder(order._id)}>Cancel Order</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyOrders;
