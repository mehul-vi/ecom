import React from 'react'
import logo from "../assets/logo.png"

function Footer() {
  return (
    <div className='w-full md:h-[36vh] h-auto mb-20 md:mb-0 bg-primary text-base py-10'>
      <div className='w-full flex flex-wrap md:flex-nowrap items-start justify-between px-6 md:px-16 py-4 gap-8'>
        <div className='md:w-[30%] w-[100%] flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <img src={logo} alt="OneCart" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
            <p className='md:text-xl text-lg font-semibold text-white'>OneCart</p>
          </div>
          <p className='md:block hidden text-base text-gray-300'>
            OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service.
          </p>
          <p className='md:hidden text-base text-gray-300'>Fast. Easy. Reliable. OneCart Shopping</p>
        </div>
        <div className='md:w-[25%] w-[45%] flex flex-col items-start gap-3'>
          <p className='text-xl font-semibold text-white'>COMPANY</p>
          <ul className='text-base space-y-2 text-gray-300'>
            <li className='cursor-pointer hover:text-secondary transition-colors'>Home</li>
            <li className='cursor-pointer hover:text-secondary transition-colors'>About us</li>
            <li className='cursor-pointer hidden md:block hover:text-secondary transition-colors'>Delivery</li>
            <li className='cursor-pointer hover:text-secondary transition-colors'>Privacy Policy</li>
          </ul>
        </div>
        <div className='md:w-[25%] w-[45%] flex flex-col items-start gap-3'>
          <p className='text-xl font-semibold text-white'>GET IN TOUCH</p>
          <ul className='text-base space-y-2 text-gray-300'>
            <li>+91-9876543210</li>
            <li>contact@onecart.com</li>
            <li className='hidden md:block'>+1-123-456-7890</li>
            <li className='hidden md:block'>admin@onecart.com</li>
          </ul>
        </div>
      </div>
      <div className='w-full h-[1px] bg-gray-700 my-4'></div>
      <div className='w-full text-gray-400 flex items-center justify-center font-medium text-sm'>
        Copyright 2025 @ezcart.com - All Rights Reserved
      </div>
    </div>
  )
}

export default Footer
