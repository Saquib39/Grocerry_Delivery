import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized request" });
        }
        const newOrder = new orderModel({
            userId: req.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        // Clear user's cart
        await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

        // Prepare Stripe checkout session items
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: { name: item.name },
                unit_amount: item.offerPrice * 100 // ✅ Fixed price calculation
            },
            quantity: item.quantity
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: { name: "Delivery Charges" },
                unit_amount: 2 * 100 // ✅ Fixed delivery charge calculation
            },
            quantity: 1
        });


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
          });
          
        if (!session.url) {
            return res.status(500).json({ success: false, message: "Stripe session creation failed" });
        }

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Failed to place order", error: error.message });
    }
};

// Cancel order functionality
const cancelOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        const order = await orderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Check the current status of the order
        if (order.status === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "Order has already been delivered and cannot be canceled"
            });
        }

        // Cancel orders that are in "Food Processing" or "Out for Delivery" status
        if (order.status === "Food Processing" || order.status === "Out for delivery") {
            order.status = "Canceled"; // Update status to 'Canceled'
            await order.save();
            return res.json({ success: true, message: "Order canceled successfully" });
        }

        // If order status is neither "Food Processing" nor "Out for Delivery"
        return res.status(400).json({
            success: false,
            message: "Order cannot be canceled at this stage"
        });

    } catch (error) {
        console.error("Error canceling order:", error);
        res.status(500).json({ success: false, message: "Error canceling order" });
    }
};

// Verifying order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log("Error", error);
        res.json({ success: false, message: "Error" });
    }
};

// User orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
};

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, cancelOrder };
