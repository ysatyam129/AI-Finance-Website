'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="pt-40 pb-20 px-4 relative overflow-hidden">
      {/* Simple Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto text-center relative z-10">
        {/* Title Animation */}
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl lg:text-[105px] pb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold"
        >
          Manage Your Finances <br /> with Intelligence
        </motion.h1>
        
        {/* Subtitle Animation */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </motion.p>
        
        {/* Buttons Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex justify-center space-x-4 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" variant="outline" className="px-8 border-2 hover:bg-gray-50">
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>

        {/* Image Section with Clean Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className="relative group"
          >
            {/* Main Image Container */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white/20 bg-white/10 backdrop-blur-sm">
              <Image
                src="/banner.jpeg"
                width={1280}
                height={720}
                alt="Dashboard Preview"
                className="w-full max-w-5xl mx-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
              
              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Simple Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>

          {/* Simple Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute top-20 -left-16 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 hidden lg:block"
          >
            <div className="text-2xl font-bold text-green-600">+₹25,000</div>
            <div className="text-sm text-gray-600">Monthly Savings</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="absolute top-32 -right-20 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200/50 hidden lg:block"
          >
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <div className="text-sm text-gray-600">Budget Efficiency</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;