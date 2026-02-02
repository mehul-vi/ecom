import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(shopDataContext)
  return (
    <div className='w-full lg:ml-8 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 border border-border'>
      <Title text1={'CART'} text2={'TOTALS'} />
      <div className='flex flex-col gap-4 mt-4 text-primary text-lg'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>
        </div>
        <hr className="border-border" />
        <div className='flex justify-between'>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>
        </div>
        <hr className="border-border" />
        <div className='flex justify-between font-bold'>
          <p>Total</p>
          <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
