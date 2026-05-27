import React from 'react'

function Title({ text1, text2 }) {
  return (
    <div className='flex flex-col items-center justify-center gap-1.5 mb-6 text-center w-full select-none'>
      <h2 className='text-2xl md:text-3xl font-bold tracking-wider text-primary uppercase'>
        {text1} <span className='text-secondary font-normal'>{text2}</span>
      </h2>
      <div className='w-12 h-[2px] bg-secondary/60 rounded-full mt-1'></div>
    </div>
  )
}

export default Title
