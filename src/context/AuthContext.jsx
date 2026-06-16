import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for mock user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('grabit_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login logic
    if (email && password) {
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email: email,
      };
      setUser(mockUser);
      localStorage.setItem('grabit_user', JSON.stringify(mockUser));
      toast.success('Logged in successfully!');
      return true;
    }
    toast.error('Invalid credentials');
    return false;
  };

  const signup = (name, phone, email, password) => {
    // Mock signup logic
    if (name && phone && email && password) {
      const mockUser = {
        id: '1',
        name: name,
        phone: phone,
        email: email,
      };
      setUser(mockUser);
      localStorage.setItem('grabit_user', JSON.stringify(mockUser));
      toast.success('Account created successfully!');
      return true;
    }
    toast.error('Please fill all fields');
    return false;
  };

  const updateUser = (updatedData) => {
    if (!user) return false;
    const mockUser = { ...user, ...updatedData };
    setUser(mockUser);
    localStorage.setItem('grabit_user', JSON.stringify(mockUser));
    toast.success('Profile updated successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('grabit_user');
    toast.info('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
