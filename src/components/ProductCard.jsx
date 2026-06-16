import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiEye } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1, product.sizes?.[0], product.colors?.[0]);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 mb-4">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        {/* Sale Badge */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sale
          </div>
        )}

        {/* Wishlist Button (Always Visible) */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            inWishlist
              ? 'bg-accent text-white scale-110'
              : 'bg-white/80 backdrop-blur-sm text-primary hover:bg-accent hover:text-white'
          }`}
        >
          <FiHeart size={16} className={inWishlist ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex flex-col px-1 flex-1">
        <span className="text-[11px] text-gray-400 mb-1 uppercase tracking-widest font-medium">{product.category}</span>
        <Link to={`/product/${product.id}`} className="font-heading font-semibold text-primary hover:text-accent transition-colors mb-1.5 line-clamp-1 text-[15px]">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-accent font-bold">₹{product.discountPrice.toLocaleString('en-IN')}</span>
              <span className="text-gray-400 line-through text-sm">₹{product.price.toLocaleString('en-IN')}</span>
            </>
          ) : (
            <span className="text-primary font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-primary text-white py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:bg-accent transition-colors"
          >
            <FiShoppingBag size={14} />
            Add to cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-8 h-8 flex-shrink-0 bg-gray-100 text-primary rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
          >
            <FiEye size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
