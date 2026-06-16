import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiMinus, FiPlus, FiTruck, FiRotateCcw, FiStar, FiShoppingBag } from 'react-icons/fi';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setActiveImage(0);
      setSelectedSize(product.sizes?.[0] || '');
      setSelectedColor(product.colors?.[0] || '');
      setQuantity(1);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">Product Not Found</h2>
        <Link to="/shop" className="bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors">Back to Shop</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 md:px-8 py-12"
    >
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        {/* Product Images */}
        <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[600px] no-scrollbar">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 h-24 flex-shrink-0 rounded-xl overflow-hidden transition-all ${
                  activeImage === idx ? 'ring-2 ring-accent ring-offset-2' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden">
            <motion.img
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col">
          <span className="text-[11px] text-gray-400 uppercase tracking-widest font-medium mb-2">{product.category}</span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={16} className={i < Math.floor(product.ratings) ? 'fill-current' : ''} />
              ))}
            </div>
            <span className="text-sm text-gray-400">{product.ratings} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-8">
            {product.discountPrice ? (
              <>
                <span className="text-4xl font-heading font-bold text-accent">₹{product.discountPrice.toLocaleString('en-IN')}</span>
                <span className="text-xl text-gray-400 line-through mb-1">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg mb-1">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              </>
            ) : (
              <span className="text-4xl font-heading font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>

          <p className="text-gray-500 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <span className="text-sm font-heading font-bold uppercase tracking-wider mb-3 block">Color</span>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-9 h-9 rounded-full transition-all ${
                      selectedColor === color ? 'ring-2 ring-accent ring-offset-2 scale-110' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color, border: color === '#FFFFFF' ? '1px solid #e5e7eb' : 'none' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-heading font-bold uppercase tracking-wider">Size</span>
                <button className="text-xs text-accent hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-11 px-4 rounded-xl text-sm font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-primary hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mb-10">
            {/* Quantity */}
            <div className="flex items-center bg-gray-100 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-11 h-12 flex items-center justify-center rounded-l-xl hover:bg-gray-200 transition-colors"
              >
                <FiMinus size={16} />
              </button>
              <span className="w-10 text-center font-heading font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-11 h-12 flex items-center justify-center rounded-r-xl hover:bg-gray-200 transition-colors"
              >
                <FiPlus size={16} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-accent text-white rounded-xl font-heading font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingBag size={20} />
              Add to Bag
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${
                inWishlist ? 'bg-accent/10 text-accent border border-accent/30' : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              <FiHeart size={20} className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                <FiTruck className="text-violet-600" size={20} />
              </div>
              <div>
                <h5 className="text-sm font-bold">Free Delivery</h5>
                <p className="text-xs text-gray-400">Orders over ₹5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <FiRotateCcw className="text-emerald-600" size={20} />
              </div>
              <div>
                <h5 className="text-sm font-bold">Free Returns</h5>
                <p className="text-xs text-gray-400">Within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-20">
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {['description', 'additional information', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl text-sm font-medium capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {tab} {tab === 'reviews' && `(${product.reviews})`}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {activeTab === 'description' && (
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                Experience unparalleled comfort and style with our {product.name}. Carefully crafted using premium materials, this piece represents the pinnacle of modern design meeting timeless elegance.
              </p>
              <p>{product.description}</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Premium quality materials</li>
                <li>Designed for comfort and durability</li>
                <li>Ethically manufactured</li>
                <li>Easy care instructions</li>
              </ul>
            </div>
          )}
          {activeTab === 'additional information' && (
            <table className="w-full text-left">
              <tbody>
                {[
                  ['Weight', '0.5 kg'],
                  ['Dimensions', '30 × 20 × 10 cm'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <th className="py-4 font-heading font-bold text-sm w-1/4">{label}</th>
                    <td className="py-4 text-gray-500 text-sm">{value}</td>
                  </tr>
                ))}
                {product.colors && (
                  <tr className="border-b border-gray-100">
                    <th className="py-4 font-heading font-bold text-sm">Colors</th>
                    <td className="py-4 flex gap-2">
                      {product.colors.map(c => <span key={c} className="inline-block w-5 h-5 rounded-full border border-gray-200" style={{ backgroundColor: c }}></span>)}
                    </td>
                  </tr>
                )}
                {product.sizes && (
                  <tr>
                    <th className="py-4 font-heading font-bold text-sm">Sizes</th>
                    <td className="py-4 text-gray-500 text-sm">{product.sizes.join(', ')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-heading font-bold">{product.ratings.toFixed(1)}</span>
                <div>
                  <div className="flex text-accent mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={18} className={i < Math.floor(product.ratings) ? 'fill-current' : ''} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">Based on {product.reviews} reviews</span>
                </div>
              </div>
              <p className="text-gray-400 italic">Customer reviews coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-3xl font-heading font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetails;
