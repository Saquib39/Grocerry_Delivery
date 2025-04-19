import React ,{useState} from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Product from './components/ProductsDisplay/ProductDisplay';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/ProductDetails/ProductDetails';
import MyOrders from './pages/MyOrders/MyOrders';
import LoginPopup from './components/LoginPopup/LoginPopup';
import PlaceOrder from './pages/placeOrder/placeOrder';
import Verify from './pages/Verify/Verify';

const App = () => {
  const [showLogin,setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product' element={<Product />} />
          <Route path='/product/:category' element={<Product />} />
          <Route path="/product/:category/:id" element={<ProductDetails />} />
          <Route path='/order' element={<PlaceOrder/>} />
          <Route path='/myorders' element={<MyOrders/>} />
          <Route path='/verify' element={<Verify/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
