import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiShoppingBag, FiHeart, FiSearch, FiUser } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'top-4 w-[95%] max-w-6xl bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 rounded-2xl py-3 px-6'
            : 'w-full max-w-7xl bg-transparent py-6 px-8'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-extrabold tracking-tight text-primary">
            GRABIT<span className="text-accent">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors rounded-xl ${
                  location.pathname === link.path
                    ? 'text-accent bg-accent/5'
                    : 'text-primary/70 hover:text-primary hover:bg-gray-100/50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Link to="/shop" className="hidden sm:flex w-10 h-10 rounded-xl items-center justify-center text-primary/70 hover:text-accent hover:bg-accent/5 transition-all">
              <FiSearch size={20} />
            </Link>
            <Link to={user ? "/account" : "/login"} className="w-10 h-10 rounded-xl flex items-center justify-center text-primary/70 hover:text-accent hover:bg-accent/5 transition-all">
              <FiUser size={20} />
            </Link>
            <Link to="/wishlist" className="relative w-10 h-10 rounded-xl flex items-center justify-center text-primary/70 hover:text-accent hover:bg-accent/5 transition-all">
              <FiHeart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative w-10 h-10 rounded-xl flex items-center justify-center text-primary/70 hover:text-accent hover:bg-accent/5 transition-all">
              <FiShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-primary hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-accent bg-accent/5'
                      : 'text-primary hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
