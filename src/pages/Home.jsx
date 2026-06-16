import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FiTruck, FiShield, FiRotateCcw, FiClock, FiInstagram, FiArrowRight, FiStar } from 'react-icons/fi';

import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

const Home = () => {
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);
  const trendingProducts = products.filter(p => p.discountPrice).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

      </section>

      {/* ==================== FEATURES BENTO ==================== */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FiTruck, title: 'Free Shipping', desc: 'On orders over ₹5,000', bg: 'bg-violet-50', color: 'text-violet-600' },
              { icon: FiRotateCcw, title: '30 Days Return', desc: 'Easy & hassle-free', bg: 'bg-sky-50', color: 'text-sky-600' },
              { icon: FiShield, title: 'Secure Payment', desc: '100% protected', bg: 'bg-emerald-50', color: 'text-emerald-600' },
              { icon: FiClock, title: '24/7 Support', desc: 'Always here for you', bg: 'bg-amber-50', color: 'text-amber-600' },
            ].map(({ icon: Icon, title, desc, bg, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${bg} rounded-2xl p-6 flex items-center gap-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center`}>
                  <Icon className={color} size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm">{title}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEW ARRIVALS ==================== */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12"
          >
            <motion.div variants={fadeUp}>
              <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Just Dropped</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">New Arrivals</h2>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Link to="/shop" className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors">
                View All <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COLLECTIONS - BENTO GRID ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Collections</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[280px]">
            {/* Women - Tall */}
            <Link to="/shop?category=Women's Fashion" className="group relative md:row-span-2 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop"
                alt="Women's Fashion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-heading font-bold text-white mb-1">Women</h3>
                <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                  Shop Now <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>

            {/* Men */}
            <Link to="/shop?category=Men's Fashion" className="group relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1987&auto=format&fit=crop"
                alt="Men's Fashion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Men</h3>
                <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                  Shop Now <FiArrowRight />
                </span>
              </div>
            </Link>

            {/* Accessories */}
            <Link to="/shop?category=Accessories" className="group relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2069&auto=format&fit=crop"
                alt="Accessories"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Accessories</h3>
                <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                  Shop Now <FiArrowRight />
                </span>
              </div>
            </Link>

            {/* Casual */}
            <Link to="/shop?category=Casual Wear" className="group relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
                alt="Casual Wear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Casual</h3>
                <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                  Shop Now <FiArrowRight />
                </span>
              </div>
            </Link>

            {/* Formal */}
            <Link to="/shop?category=Formal Wear" className="group relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594938298598-712411e74aed?q=80&w=2000&auto=format&fit=crop"
                alt="Formal Wear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-heading font-bold text-white mb-1">Formal</h3>
                <span className="text-white/70 text-sm flex items-center gap-1 group-hover:text-accent transition-colors">
                  Shop Now <FiArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== BEST SELLERS ==================== */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Most Loved</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">Best Sellers</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TRENDING / SALE BANNER ==================== */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center">
              <span className="text-accent font-bold text-sm uppercase tracking-widest mb-4 block">Limited Time</span>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                Up to <span className="text-accent">40%</span> Off
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md">
                Explore our end-of-season sale. Premium pieces at incredible prices — while stocks last.
              </p>
              <Link to="/shop" className="bg-accent text-white px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-indigo-700 transition-colors inline-flex items-center gap-2 w-fit">
                Shop Sale <FiArrowRight />
              </Link>
            </div>
            <div className="lg:w-1/2 h-80 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop"
                alt="Sale"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold">What Our Customers Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya S.', text: 'The quality is unbelievable for the price. My new go-to brand for everyday essentials.', rating: 5 },
              { name: 'Arjun M.', text: 'Love the minimalist aesthetic. The trench coat I ordered looks just like the photos. Shipping was fast too!', rating: 5 },
              { name: 'Ananya R.', text: 'Finally found a brand that balances style and comfort. Their customer service is excellent.', rating: 5 },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex text-accent mb-4">
                  {[...Array(review.rating)].map((_, j) => <FiStar key={j} className="fill-current" size={16} />)}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-heading font-bold text-sm">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INSTAGRAM GALLERY ==================== */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center mb-12">
          <span className="text-accent font-bold text-sm uppercase tracking-widest mb-2 block">Follow Us</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">@GrabitFashion</h2>
        </div>
        <div className="flex gap-4 px-4">
          {[
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550614000-4b95d4662231?q=80&w=600&auto=format&fit=crop"
          ].map((img, i) => (
            <div key={i} className="flex-1 aspect-square relative group rounded-2xl overflow-hidden">
              <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-2xl">
                <FiInstagram className="text-white opacity-0 group-hover:opacity-100 text-3xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
