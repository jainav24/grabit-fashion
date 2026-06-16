import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero */}
      <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden rounded-b-[3rem]">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
          alt="About Us Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            Est. 2024
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl font-heading font-bold mb-4">
            About <span className="text-accent">Grabit</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-white/70 max-w-lg mx-auto">
            Defining modern elegance through minimalist luxury.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-20">
        {/* Our Story */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-24">
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="lg:w-1/2">
            <span className="text-accent font-bold text-sm uppercase tracking-widest mb-3 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">Built on a Belief in <span className="text-accent">Better</span></h2>
            <p className="text-gray-500 mb-4 leading-relaxed text-lg">
              Founded on the belief that premium fashion should be accessible without compromising on quality or ethics, Grabit Fashion emerged from a desire to create a wardrobe of modern essentials.
            </p>
            <p className="text-gray-500 leading-relaxed text-lg">
              We design our collections with an emphasis on longevity, versatile silhouettes, and exceptional fabrics. Every piece is carefully crafted to seamlessly integrate into your daily life.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1fac084092?q=80&w=2069&auto=format&fit=crop"
              alt="Design Studio"
              className="w-full h-auto object-cover rounded-3xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Values Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { title: 'Our Mission', desc: 'To inspire confidence through high-quality, sustainably made fashion that empowers individuality.', color: 'bg-violet-50', accent: 'text-violet-600' },
            { title: 'Our Vision', desc: 'To become a global leader in accessible luxury, redefining industry standards for sustainability and design.', color: 'bg-sky-50', accent: 'text-sky-600' },
            { title: 'Our Values', desc: 'Integrity, innovation, inclusivity, and an unwavering commitment to exceptional customer experience.', color: 'bg-amber-50', accent: 'text-amber-600' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`${item.color} rounded-3xl p-10 hover:shadow-lg transition-shadow`}
            >
              <h3 className={`text-xl font-heading font-bold mb-4 ${item.accent}`}>{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-primary rounded-3xl p-12 md:p-16 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '200+', label: 'Products' },
              { number: '15+', label: 'Cities' },
              { number: '99%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-4xl md:text-5xl font-heading font-bold text-accent block mb-2">{stat.number}</span>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <span className="text-accent font-bold text-sm uppercase tracking-widest mb-3 block">The Team</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Meet The Creators</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-12">The passionate individuals behind the brand.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Emma Watson", role: "Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" },
              { name: "James Smith", role: "Lead Designer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" },
              { name: "Sarah Chen", role: "Marketing Head", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop" },
              { name: "David Miller", role: "Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" }
            ].map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center group"
              >
                <div className="w-40 h-40 rounded-2xl overflow-hidden mb-4 shadow-lg">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-heading font-bold text-lg">{member.name}</h4>
                <p className="text-sm text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
