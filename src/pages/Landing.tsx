// import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Navbar from "./Navbar";
import React from "react";
import Stats from "./Stats";
import Features from "./Features";
import Testimonials from "./Testimonials";
import SectionCTA from "./SectionCTA";
import homeImg from '../images/homeImg.png'

const Landing: React.FC = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-lavender to-white pt-[84px]">
      <Navbar />
      {/* Hero Section */}
      <section className="lg:flex lg:justify-center items-center container mx-auto px-6 py-20 text-center lg:text-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:pr-10"
        >
          <h2 className="text-5xl lg:text-6xl font-bold font-poppins text-deep-purple mb-6 leading-tight">
            Track Your Habits
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-inter">
            Build good <span className="text-teal">Habits</span>, Break bad once
            and reach your <span className="text-teal">Goals</span>!
          </p>
          <div className="py-5">
            <Link
              to="/signup"
              className="bg-deep-purple text-white px-8 py-4 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-all transform hover:scale-105 font-medium text-lg inline-block duration-300 font-inter md:mr-10 mx-2"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="bg-white text-deep-purple px-8 py-4 rounded-tr-xl rounded-bl-xl hover:bg-gray-100 transition-colors font-medium text-lg inline-block border border-deep-purple font-inter mt-5 md:mt-0 mx-2"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
        <img src={homeImg} alt="habits" className="md:w-[80%] lg:w-[410px] lg:pl-10 mx-auto lg:mx-0 mt-10 lg:mt-0" loading="lazy"/>
      </section>

      <Features />
      <Stats />
      <Testimonials />
      <SectionCTA />
      <Footer />
    </div>
  );
};

export default Landing;
