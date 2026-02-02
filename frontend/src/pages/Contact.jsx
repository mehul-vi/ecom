import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-[100vh] flex flex-col items-center justify-center gap-10 pt-20 px-8 bg-base'>
      <Title text1={'CONTACT'} text2={'US'} />
      <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-12'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img src={contact} alt="Contact Us" className='lg:w-2/3 w-4/5 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]' />
        </div>
        <div className='lg:w-1/2 w-4/5 flex flex-col items-start gap-6 text-primary'>
          <p className='text-xl font-bold'>Our Store</p>
          <div className='text-lg leading-relaxed'>
            <p>12345 Random Station</p>
            <p>Random City, State, India</p>
          </div>
          <div className='text-lg leading-relaxed'>
            <p>Tel: +91-9876543210</p>
            <p>Email: admin@onecart.com</p>
          </div>
          <p className='text-xl font-bold mt-6'>Careers at OneCart</p>
          <p className='text-lg leading-relaxed'>Learn more about our teams and job openings</p>
          <button className='px-10 py-5 bg-primary text-white rounded-full hover:bg-secondary transition'>
            Explore Jobs
          </button>
        </div>
      </div>
      <NewLetterBox />
    </div>
  )
}

export default Contact
