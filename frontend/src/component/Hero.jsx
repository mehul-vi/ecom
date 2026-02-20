import React from "react";

function Hero({ heroData }) {
  return (
    <div className="absolute inset-0 flex items-center justify-start px-4 sm:px-8 md:px-[8%] z-20">

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent rounded-2xl"></div>

      {/* Animated Text */}
      <motion.div
        key={heroData.text1}          // Text animate hota hai
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -60 }}
        transition={{ duration: 0.8 }}
        className="relative text-white max-w-xl flex flex-col gap-4 
                   md:text-left text-center mx-auto md:mx-0"
      >
        <p className="text-gray-300 text-lg uppercase tracking-[3px] font-light">
          {heroData.text1}
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {heroData.text2}
        </h1>

        <p className="text-gray-200 text-base md:text-lg font-light max-w-md leading-relaxed">
          Elevate your style with confidence — curated trends just for you.
        </p>

        {/* Button fixed with text */}
        <div className="mt-6 flex justify-center md:justify-start">
          <button className="px-10 py-3 bg-[#0EA5E9] rounded-full text-lg font-semibold shadow-lg 
                             hover:bg-[#0284C7] transition-all duration-300 hover:scale-105">
            Shop Now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;
