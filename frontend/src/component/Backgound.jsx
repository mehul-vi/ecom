import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

function Backgound({ heroCount }) {
  const backgrounds = [back2, back1, back3, back4];

  return (
    <div className='w-full h-full relative overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-border/10'>
      <AnimatePresence mode='wait'>
        <motion.img
          key={heroCount}
          src={backgrounds[heroCount]}
          alt={`Background ${heroCount}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className='w-full h-full object-cover absolute inset-0'
        />
      </AnimatePresence>
    </div>
  );
}

export default Backgound;
