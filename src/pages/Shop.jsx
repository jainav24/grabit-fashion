import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiSearch, FiSliders } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortOption, setSortOption] = useState('Featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    if (priceRange !== 'All') {
      const [min, max] = priceRange.split('-').map(Number);
      result = result.filter(p => {
        const price = p.discountPrice || p.price;
        if (max) return price >= min && price <= max;
        return price >= min;
      });
    }

    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'Price: High to Low':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'Newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    setFilteredProducts([...result]);
  }, [searchTerm, selectedCategory, priceRange, sortOption]);

  const priceRanges = ['All', '0-5000', '5000-10000', '10000-20000', '20000+'];
  const sortOptions = ['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-primary text-white py-16 rounded-b-[3rem]">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">Shop Collection</h1>
          <p className="text-gray-400 max-w-lg text-lg">
            Explore our curated collection of premium fashion essentials.
          </p>
          {/* Search Bar */}
          <div className="relative max-w-md mt-8">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/10 backdrop-blur-sm rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 mb-8 items-center">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 text-sm font-medium shadow-sm border border-gray-100 hover:border-accent transition-colors"
          >
            <FiSliders size={16} />
            Filters
          </button>

          {/* Category Pills */}
          <div className="hidden lg:flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCategory('All'); navigate('/shop'); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-gray-100 hover:border-primary'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); navigate(`/shop?category=${encodeURIComponent(cat)}`); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 border border-gray-100 hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Sort & Count */}
          <span className="text-sm text-gray-400 hidden md:block">{filteredProducts.length} results</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-white border border-gray-100 rounded-xl text-sm font-medium px-4 py-2.5 focus:outline-none focus:border-accent cursor-pointer"
          >
            {sortOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Mobile Filter Panel */}
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading font-bold text-lg">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
                <FiX size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-gray-400">Category</h4>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setSelectedCategory('All'); navigate('/shop'); }} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>All</button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => { setSelectedCategory(cat); navigate(`/shop?category=${encodeURIComponent(cat)}`); }} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>{cat}</button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-gray-400">Price Range</h4>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map(range => (
                  <button key={range} onClick={() => setPriceRange(range)} className={`px-3 py-1.5 rounded-lg text-sm transition-all ${priceRange === range ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {range === 'All' ? 'All Prices' : range === '20000+' ? '₹20,000+' : `₹${range.split('-')[0]} - ₹${range.split('-')[1]}`}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Price Filter */}
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider mb-4 text-gray-400">Price Range</h4>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setPriceRange(range)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      priceRange === range ? 'bg-accent/10 text-accent font-medium' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {range === 'All' ? 'All Prices' : range === '20000+' ? '₹20,000+' : `₹${Number(range.split('-')[0]).toLocaleString('en-IN')} - ₹${Number(range.split('-')[1]).toLocaleString('en-IN')}`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <FiSearch size={32} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">No products found</h3>
                <p className="text-gray-500 mb-8">Try adjusting your filters or search term.</p>
                <button
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setPriceRange('All'); }}
                  className="text-accent hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Shop;
