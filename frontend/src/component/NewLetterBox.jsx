import React from 'react'

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className='w-full h-[40vh] bg-primary flex flex-col items-center justify-center gap-4 text-center'>
      <p className='md:text-3xl text-xl text-white font-semibold px-6'>Subscribe now & get 20% off</p>
      <p className='md:text-lg text-sm text-center text-gray-300 font-semibold px-6 max-w-xl'>
        Subscribe now and enjoy exclusive savings, special deals, and early access to new collections.
      </p>
      <form onSubmit={handleSubmit} className='flex items-center justify-center gap-4 px-6 w-full max-w-4xl flex-wrap sm:flex-nowrap'>
        <input type="email" placeholder='Enter Your Email' required
          className='placeholder-gray-500 bg-white w-full max-w-md h-12 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary text-primary' />
        <button type='submit' className='text-base px-8 py-3 bg-secondary text-white rounded-full hover:bg-white hover:text-secondary transition-all font-semibold shadow-md'>
          Subscribe
        </button>
      </form>
    </div>
  )
}

export default NewLetterBox
