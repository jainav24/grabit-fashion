import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <div className="bg-primary text-white py-20 rounded-b-[3rem]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Get In Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-gray-400 max-w-lg mx-auto text-lg">
            We'd love to hear from you. Our team is always ready to help.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 mb-16">
          {[
            { icon: FiMapPin, title: 'Visit Us', lines: ['123 Fashion Avenue', 'New York, NY 10001'], color: 'bg-violet-50', iconColor: 'text-violet-600' },
            { icon: FiPhone, title: 'Call Us', lines: ['+1 (555) 123-4567', 'Mon-Fri 9am-6pm EST'], color: 'bg-sky-50', iconColor: 'text-sky-600' },
            { icon: FiMail, title: 'Email Us', lines: ['support@grabit.com', 'info@grabit.com'], color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15 }}
              className={`${card.color} rounded-2xl p-8 text-center hover:shadow-lg transition-shadow`}
            >
              <div className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mx-auto mb-4`}>
                <card.icon className={card.iconColor} size={24} />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">{card.title}</h3>
              {card.lines.map((line, j) => (
                <p key={j} className="text-gray-500 text-sm">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-3 block">Send a Message</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">We'd love to hear<br />from you</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="email">Email</label>
                <input type="email" id="email" required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="subject">Subject</label>
                <input type="text" id="subject" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" placeholder="Order inquiry, returns, etc." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2" htmlFor="message">Message</label>
                <textarea id="message" required rows="5" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all resize-none" placeholder="How can we help?" />
              </div>
              <button type="submit" className="bg-accent text-white px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                Send Message <FiSend size={18} />
              </button>
            </form>
          </div>

          {/* Store Hours & Map */}
          <div className="lg:w-1/2 space-y-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h4 className="font-heading font-bold text-xl mb-6">Store Hours</h4>
              <div className="space-y-3 text-sm">
                {[
                  ['Monday – Friday', '10:00 AM – 8:00 PM'],
                  ['Saturday', '10:00 AM – 6:00 PM'],
                  ['Sunday', 'Closed'],
                ].map(([day, time]) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="font-medium">{day}</span>
                    <span className="text-gray-500">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center overflow-hidden relative">
              <div className="text-center text-gray-500">
                <FiMapPin size={40} className="mx-auto mb-3 text-gray-400" />
                <p className="font-heading font-bold">Google Maps</p>
                <p className="text-sm">40.7128° N, 74.0060° W</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
