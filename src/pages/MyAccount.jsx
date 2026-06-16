import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiPackage, FiMapPin, FiLogOut, FiSettings, FiEdit2, FiPlus, FiTrash2, FiBell } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { toast } from 'sonner';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const MyAccount = () => {
  const { user, logout, updateUser, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Mock Addresses State
  const [addresses, setAddresses] = useState([
    { id: 1, type: 'Home', street: '123 Fashion Ave, Apt 4B', city: 'Mumbai', state: 'Maharashtra', zip: '400001', isDefault: true },
  ]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: 'Home', street: '', city: '', state: '', zip: '' });

  // Settings State
  const [settings, setSettings] = useState({
    newsletter: true,
    smsAlerts: false,
    orderUpdates: true,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '+91 98765 43210',
      });
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    updateUser(profileData);
    setIsEditingProfile(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { ...newAddress, id: Date.now(), isDefault: addresses.length === 0 }]);
    setIsAddingAddress(false);
    setNewAddress({ type: 'Home', street: '', city: '', state: '', zip: '' });
    toast.success('Address added successfully!');
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast.success('Address removed');
  };

  const toggleSetting = (key) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      toast.success('Preferences updated');
      return next;
    });
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 min-h-[80vh]">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-12">
        <h1 className="text-4xl font-heading font-bold mb-2">My Account</h1>
        <p className="text-gray-500">Welcome back, {user.name}!</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="lg:col-span-1 space-y-4">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xl font-bold font-heading">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-heading font-bold text-base truncate">{user.name}</h3>
              <p className="text-gray-500 text-xs truncate">{user.email}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <nav className="flex flex-col p-2">
              {[
                { id: 'profile', label: 'Profile Info', icon: FiUser },
                { id: 'orders', label: 'My Orders', icon: FiPackage },
                { id: 'addresses', label: 'Saved Addresses', icon: FiMapPin },
                { id: 'settings', label: 'Settings', icon: FiSettings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-left font-medium rounded-xl transition-colors ${
                    activeTab === tab.id ? 'bg-gray-50 text-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  <tab.icon className={activeTab === tab.id ? 'text-accent' : ''} /> {tab.label}
                </button>
              ))}
              
              <div className="h-px bg-gray-100 my-2 mx-4"></div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-left text-red-500 hover:bg-red-50 font-medium rounded-xl transition-colors"
              >
                <FiLogOut /> Sign Out
              </button>
            </nav>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div key="profile" initial="hidden" animate="visible" exit="exit" variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-heading font-bold">Profile Information</h2>
                  {!isEditingProfile && (
                    <button onClick={() => setIsEditingProfile(true)} className="flex items-center gap-2 text-accent text-sm font-medium hover:underline">
                      <FiEdit2 size={14} /> Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-6 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input type="text" required value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input type="email" required value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input type="tel" required value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none" />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                      <Button type="submit" variant="primary">Save Changes</Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-lg">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium text-lg">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-lg">{user.phone || '+91 98765 43210'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Password</p>
                      <p className="font-medium text-lg">••••••••</p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <motion.div key="orders" initial="hidden" animate="visible" exit="exit" variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-heading font-bold mb-8 border-b border-gray-100 pb-4">My Orders</h2>
                <div className="space-y-6">
                  {[
                    { id: 'ORD-2026-894', date: 'June 12, 2026', total: '₹12,499', status: 'Delivered', color: 'text-emerald-500 bg-emerald-50' },
                    { id: 'ORD-2026-752', date: 'May 28, 2026', total: '₹4,299', status: 'Shipped', color: 'text-blue-500 bg-blue-50' },
                    { id: 'ORD-2026-611', date: 'April 10, 2026', total: '₹8,999', status: 'Cancelled', color: 'text-red-500 bg-red-50' }
                  ].map((order, i) => (
                    <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-gray-100 rounded-2xl hover:border-accent/20 transition-colors bg-gray-50/50">
                      <div className="flex items-center gap-5 mb-4 sm:mb-0">
                        <div className="w-14 h-14 bg-white shadow-sm rounded-xl flex items-center justify-center">
                          <FiPackage className="text-accent text-xl" />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-lg">{order.id}</p>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right w-full sm:w-auto">
                        <p className="font-bold text-xl mb-1">{order.total}</p>
                        <p className={`text-xs font-bold px-3 py-1 rounded-full inline-block ${order.color}`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <motion.div key="addresses" initial="hidden" animate="visible" exit="exit" variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-heading font-bold">Saved Addresses</h2>
                  {!isAddingAddress && (
                    <button onClick={() => setIsAddingAddress(true)} className="flex items-center gap-2 text-accent text-sm font-medium hover:underline">
                      <FiPlus size={16} /> Add New
                    </button>
                  )}
                </div>

                {isAddingAddress ? (
                  <form onSubmit={handleAddAddress} className="space-y-6 max-w-lg bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="font-bold font-heading mb-4">Add New Address</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                        <select value={newAddress.type} onChange={(e) => setNewAddress({...newAddress, type: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none">
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                        <input type="text" required value={newAddress.zip} onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input type="text" required value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input type="text" required value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input type="text" required value={newAddress.state} onChange={(e) => setNewAddress({...newAddress, state: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent/20 outline-none" />
                      </div>
                    </div>
                    <div className="flex gap-4 pt-2">
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>Cancel</Button>
                      <Button type="submit" variant="primary" size="sm">Save Address</Button>
                    </div>
                  </form>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border border-gray-200 rounded-2xl p-6 relative group hover:border-accent/30 transition-colors">
                        {addr.isDefault && <span className="absolute top-4 right-4 text-xs font-bold bg-accent/10 text-accent px-2 py-1 rounded-md">Default</span>}
                        <div className="flex items-center gap-2 mb-4">
                          <FiMapPin className="text-gray-400" />
                          <h3 className="font-bold font-heading">{addr.type}</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                          {addr.street}<br/>
                          {addr.city}, {addr.state} {addr.zip}
                        </p>
                        <button onClick={() => deleteAddress(addr.id)} className="text-red-500 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <FiTrash2 size={14}/> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial="hidden" animate="visible" exit="exit" variants={fadeUp} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-heading font-bold mb-8 border-b border-gray-100 pb-4">Account Settings</h2>
                
                <div className="space-y-8 max-w-2xl">
                  <div>
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FiBell className="text-accent" /> Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="font-medium">Email Newsletter</p>
                          <p className="text-sm text-gray-500">Receive weekly updates on new arrivals and offers.</p>
                        </div>
                        <button onClick={() => toggleSetting('newsletter')} className={`w-12 h-6 rounded-full transition-colors relative ${settings.newsletter ? 'bg-accent' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.newsletter ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="font-medium">SMS Alerts</p>
                          <p className="text-sm text-gray-500">Get text messages for exclusive flash sales.</p>
                        </div>
                        <button onClick={() => toggleSetting('smsAlerts')} className={`w-12 h-6 rounded-full transition-colors relative ${settings.smsAlerts ? 'bg-accent' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.smsAlerts ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                        <div>
                          <p className="font-medium">Order Updates</p>
                          <p className="text-sm text-gray-500">Get notified when your order status changes.</p>
                        </div>
                        <button onClick={() => toggleSetting('orderUpdates')} className={`w-12 h-6 rounded-full transition-colors relative ${settings.orderUpdates ? 'bg-accent' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.orderUpdates ? 'translate-x-7' : 'translate-x-1'}`}></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-lg mb-4 text-red-500">Danger Zone</h3>
                    <div className="p-4 border border-red-100 bg-red-50/50 rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-600">Delete Account</p>
                        <p className="text-sm text-red-500/80">Permanently delete your account and all data.</p>
                      </div>
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">Delete</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
