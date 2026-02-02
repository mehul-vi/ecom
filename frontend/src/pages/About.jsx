import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-[100vh] flex items-center justify-center flex-col bg-base gap-10 pt-20 px-8'>
      <Title text1={'ABOUT'} text2={'US'} />
      <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-12'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src={about} alt="About Us" className='lg:w-2/3 w-4/5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]' />
        </div>
        <div className='lg:w-1/2 w-4/5 flex flex-col items-start gap-6 text-primary'>
          <p className='text-lg leading-relaxed'>
            OneCart born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='text-lg leading-relaxed'>
            Modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
          </p>
          <p className='text-xl font-semibold mt-4'>Our Mission</p>
          <p className='text-lg leading-relaxed'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      <div className='w-full flex flex-col items-center gap-6'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
        <div className='w-4/5 flex flex-col lg:flex-row justify-between gap-8 py-10'>
          <div className='lg:w-1/3 w-full bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-primary flex flex-col items-center gap-4 border border-border'>
            <b className='text-2xl font-semibold text-secondary'>Quality Assurance</b>
            <p className='text-base leading-relaxed text-gray-500 text-center'>
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>
          </div>
          <div className='lg:w-1/3 w-full bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-primary flex flex-col items-center gap-4 border border-border'>
            <b className='text-2xl font-semibold text-secondary'>Convenience</b>
            <p className='text-base leading-relaxed text-gray-500 text-center'>
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>
          </div>
          <div className='lg:w-1/3 w-full bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 text-primary flex flex-col items-center gap-4 border border-border'>
            <b className='text-2xl font-semibold text-secondary'>Exceptional Customer Service</b>
            <p className='text-base leading-relaxed text-gray-500 text-center'>
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About
