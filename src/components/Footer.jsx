import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiArrowUpRight } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-8 rounded-t-[3rem]">
      <div className="container mx-auto px-4 md:px-8">
        {/* Top Section - CTA */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Let's Stay <span className="text-accent">Connected</span>
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8 text-lg">
            Subscribe and get 15% off your first order plus exclusive access to new drops.
          </p>
          <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/10 rounded-l-xl px-5 py-4 text-sm focus:outline-none focus:border-accent placeholder-gray-500 transition-colors"
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-4 font-bold rounded-r-xl hover:bg-indigo-700 transition-colors text-sm flex items-center gap-1"
            >
              Subscribe <FiArrowUpRight size={16} />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-heading font-extrabold mb-4 tracking-tight">
              GRABIT<span className="text-accent">.</span>
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium fashion for the modern individual. Designed with intention, crafted for longevity.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Explore</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '#' },
                { name: 'Careers', path: '#' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Shop</h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Women's", path: "/shop?category=Women's+Fashion" },
                { name: "Men's", path: "/shop?category=Men's+Fashion" },
                { name: 'Accessories', path: '/shop?category=Accessories' },
                { name: 'New Arrivals', path: '/shop' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-500 hover:text-white transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-6 text-gray-400">Support</h4>
            <ul className="space-y-3 text-sm">
              {['Shipping', 'Returns', 'Size Guide', 'Track Order'].map(name => (
                <li key={name}>
                  <a href="#" className="text-gray-500 hover:text-white transition-colors">{name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} Grabit Fashion. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
