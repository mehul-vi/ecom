import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full min-h-[50vh] flex flex-col items-center justify-center gap-12 bg-white py-16 px-4'>
      <div className='text-center w-full max-w-4xl'>
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className='text-gray-500 text-lg max-w-xl mx-auto'>Customer-Friendly Policies – Committed to Your Satisfaction and Safety.</p>
      </div>
      <div className='flex flex-wrap justify-center gap-16'>
        <div className='w-[300px] flex flex-col items-center gap-4 text-center'>
          <RiExchangeFundsLine className='w-14 h-14 md:w-16 md:h-16 text-secondary' />
          <p className='font-semibold text-xl text-primary'>Easy Exchange Policy</p>
          <p className='text-sm text-gray-500'>Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.</p>
        </div>
        <div className='w-[300px] flex flex-col items-center gap-4 text-center'>
          <TbRosetteDiscountCheckFilled className='w-14 h-14 md:w-16 md:h-16 text-secondary' />
          <p className='font-semibold text-xl text-primary'>7 Days Return Policy</p>
          <p className='text-sm text-gray-500'>Shop with Confidence – 7 Days Easy Return Guarantee.</p>
        </div>
        <div className='w-[300px] flex flex-col items-center gap-4 text-center'>
          <BiSupport className='w-14 h-14 md:w-16 md:h-16 text-secondary' />
          <p className='font-semibold text-xl text-primary'>Best Customer Support</p>
          <p className='text-sm text-gray-500'>Trusted Customer Support – Your Satisfaction Is Our Priority.</p>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy
