import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext)
  let navigate = useNavigate()

  // Truncate long product names
  const truncateName = (text, maxLength = 40) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Format price with currency
  const formatPrice = (price) => {
    return `${currency} ${price}`;
  };

  return (
    <div
      className='w-full max-w-[300px] h-[400px] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] cursor-pointer overflow-hidden flex flex-col p-4 border border-border hover:scale-105 transition-transform duration-300 mx-auto'
      onClick={() => navigate(`/productdetail/${id}`)}
    >
      {/* Image Container - Fixed height */}
      <div className='w-full h-[65%] rounded-2xl overflow-hidden'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
        />
      </div>

      {/* Content Container - Fixed height with proper spacing */}
      <div className='flex-1 flex flex-col justify-between pt-3'>
        {/* Product Name with truncation */}
        <div className='text-primary text-lg font-semibold leading-tight min-h-[48px] flex items-start'>
          {truncateName(name)}
        </div>

        {/* Price - Always at bottom */}
        <div className='text-secondary text-xl font-medium mt-2'>
          {formatPrice(price)}
        </div>
      </div>
    </div>
  )
}

export default Card