import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMoveToCart = (product) => {
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
    removeFromWishlist(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-primary text-white py-16 rounded-b-[3rem]">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold">Wishlist</h1>
          <p className="text-gray-400 mt-2 text-lg">{wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-8">
              <FiHeart size={40} className="text-gray-300" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Save the items you love to your wishlist and come back to them later.</p>
            <Link to="/shop" className="bg-accent text-white px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {wishlist.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-1">{product.category}</span>
                  <Link to={`/product/${product.id}`} className="font-heading font-semibold text-primary hover:text-accent transition-colors mb-2 line-clamp-1">
                    {product.name}
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    {product.discountPrice ? (
                      <>
                        <span className="text-accent font-bold">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                        <span className="text-gray-400 line-through text-sm">₹{product.price.toLocaleString('en-IN')}</span>
                      </>
                    ) : (
                      <span className="text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl hover:bg-accent transition-colors text-sm font-heading font-bold"
                  >
                    <FiShoppingCart size={16} />
                    Move to Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Wishlist;
