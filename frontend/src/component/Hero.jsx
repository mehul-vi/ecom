import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col md:flex-row border border-border bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] select-none'>
      {/* Hero Left Panel: Elegant static typography & Call to Action */}
      <div className='w-full md:w-1/2 flex flex-col items-start justify-center p-8 md:p-16 lg:p-20 bg-white text-primary gap-4'>
        <div className='flex items-center gap-2'>
          <p className='w-8 h-[2px] bg-secondary'></p>
          <p className='font-semibold text-xs md:text-sm text-secondary uppercase tracking-[3px]'>NEW ARRIVALS</p>
        </div>
        
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-primary uppercase tracking-tight'>
          Style That Speaks <br />
          <span className='text-secondary font-semibold normal-case'>Without Words</span>
        </h1>
        
        <p className='text-secondary/80 text-sm md:text-base max-w-md leading-relaxed font-medium mt-1'>
          Discover our latest curated drops. Modern premium wardrobe essentials crafted with fine cotton, linen, and fleece for exceptional comfort.
        </p>
        
        <button 
          className='btn-primary mt-4'
          onClick={() => navigate('/collection')}
        >
          Shop Latest Collection
        </button>
      </div>

      {/* Hero Right Panel: Premium static fashion imagery */}
      <div className='w-full md:w-1/2 h-[300px] md:h-[500px]'>
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop&q=80" 
          alt="Premium Minimalist Apparel" 
          className='w-full h-full object-cover' 
        />
      </div>
    </div>
  );
}

export default Hero;
