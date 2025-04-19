import { createContext, useEffect, useState } from "react";
// import { dummyProducts } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [promo, setPromo] = useState(false);
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [productList, setProductList] = useState([]);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
    };

    const removeFromCart = async (itemId) => { 
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
        }
    };
    const getCartItemCount = () => {
        let total = 0;
        for (let key in cartItems) {
          total += cartItems[key]; // Assuming cartItems = { productId: quantity }
        }
        return total;
      };
      
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = productList.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.offerPrice * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchProductList = async () => {
        try {
            const response = await axios.get(url + "/api/product/list");
            setProductList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        productList,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        promo,
        setPromo,
        url,
        token,
        setToken,
        getCartItemCount
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
