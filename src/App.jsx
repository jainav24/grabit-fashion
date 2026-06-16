import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyAccount from './pages/MyAccount';
import Checkout from './pages/Checkout';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Screen — plays video then swipes up */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main App — rendered behind the loading screen so it's ready instantly */}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="cart" element={<Cart />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="account" element={<MyAccount />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
