import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { toast } from 'sonner';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if cart is empty or not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    altPhone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      toast.success('Order placed successfully!', {
        icon: <FiCheckCircle className="text-green-500" />
      });
      navigate('/account');
    }, 1000);
  };

  if (!user || cart.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4 md:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent font-medium mb-8 transition-colors">
          <FiArrowLeft /> Back to Cart
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 mb-8">
              <h2 className="text-2xl font-heading font-bold mb-8">Shipping Information</h2>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alternative Phone Number (Optional)</label>
                  <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="In case we can't reach your primary number" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-xl font-heading font-bold mb-6">Delivery Address</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none mb-4" placeholder="House number and street name" />
                  <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" placeholder="Apartment, suite, unit, etc. (optional)" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                    <input required type="text" name="zip" value={formData.zip} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                  </div>
                </div>

              </form>
            </div>
            
            {/* Payment Method Preview */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-xl font-heading font-bold mb-4">Payment Method</h2>
              <div className="p-4 rounded-xl border border-accent bg-accent/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-accent border-4 border-white shadow-[0_0_0_1px_#4F46E5]"></div>
                  <span className="font-medium text-gray-800">Cash on Delivery (COD)</span>
                </div>
                <span className="text-sm text-gray-500">Pay when you receive</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-28">
              <h3 className="text-xl font-heading font-bold mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="font-medium text-sm">
                      ₹{((item.discountPrice || item.price) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-sm border-t border-gray-100 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString('en-IN')}`}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-100 pt-4 mb-8">
                <span className="text-lg font-heading font-bold">Total</span>
                <span className="text-2xl font-heading font-bold text-accent">₹{total.toLocaleString('en-IN')}</span>
              </div>

              <Button type="submit" form="checkout-form" variant="primary" size="full" className="py-4 text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40">
                Place Order
              </Button>
              <p className="text-center text-xs text-gray-400 mt-4">
                By placing your order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Checkout;
