"use client";

import React from "react";
import { motion } from "framer-motion";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-background font-manrope transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-primary/10 blur-[80px] sm:blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] sm:w-[40%] h-[40%] bg-blue-500/5 blur-[80px] sm:blur-[120px] rounded-full animate-pulse" />
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] dark:invert" />


      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="z-10 w-full flex justify-center px-4 py-20 sm:py-8"
      >
        {children}
      </motion.div>

      {/* Decorative Branding */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 flex items-center gap-2">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="text-primary-foreground font-black text-lg sm:text-xl">L</span>
        </div>
        <span className="text-foreground font-black text-base sm:text-xl tracking-tighter">LANKA FOOD SOURCE</span>
      </div>
    </div>

  );
};
