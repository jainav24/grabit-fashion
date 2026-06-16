import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'GRABIT10') {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold">Your Bag</h1>
          <p className="text-gray-400 mt-2 text-lg">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-8">
              <FiShoppingBag size={40} className="text-gray-300" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your bag yet. Start exploring our collection.</p>
            <Link to="/shop">
              <Button variant="primary" size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-6 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="w-28 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`} className="font-heading font-bold text-lg hover:text-accent transition-colors">
                        {item.name}
                      </Link>
                      <div className="flex gap-4 text-sm text-gray-500 mt-1">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            Color: <span className="w-3 h-3 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: item.selectedColor }}></span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center bg-gray-100 rounded-full">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-bold text-lg">₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}</span>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mt-4">
                ← Continue Shopping
              </Link>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-28">
                <h3 className="text-xl font-heading font-bold mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">Free shipping on orders over ₹5,000</p>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-4 mb-6">
                  <span className="text-lg font-heading font-bold">Total</span>
                  <span className="text-2xl font-heading font-bold">₹{total.toLocaleString('en-IN')}</span>
                </div>

                {/* Coupon */}
                <div className="mb-6">
                  <p className="text-xs text-gray-400 mb-2">Try coupon: GRABIT10</p>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-grow bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                    />
                    <button type="submit" className="bg-primary text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-accent transition-colors">
                      Apply
                    </button>
                  </form>
                </div>

                <button 
                  onClick={() => {
                    if (!user) {
                      navigate('/login');
                    } else {
                      navigate('/checkout');
                    }
                  }}
                  className="w-full bg-accent text-white py-4 rounded-xl font-heading font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  Checkout <FiArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Cart;
