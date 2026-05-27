import React from 'react';
import Hero from '../component/Hero';
import Product from './Product';
import OurPolicy from '../component/OurPolicy';
import NewLetterBox from '../component/NewLetterBox';
import Footer from '../component/Footer';

function Home() {
  return (
    <div className='overflow-x-hidden relative top-[70px] bg-base flex flex-col gap-12 px-4 md:px-8 max-w-7xl mx-auto w-full pt-6 pb-20'>
      {/* Clean Split Hero Banner */}
      <Hero />

      {/* Product Listings (Latest & Bestsellers) */}
      <Product />

      {/* Store Features & Policies */}
      <OurPolicy />

      {/* Newsletter signup */}
      <NewLetterBox />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
