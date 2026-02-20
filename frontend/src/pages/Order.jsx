import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/userorder', {}, { withCredentials: true })
      if (result.data) {
        let allOrdersItem = []
        result.data.forEach(order => {
          order.items.forEach(item => {
            item.status = order.status
            item.payment = order.payment
            item.paymentMethod = order.paymentMethod
            item.date = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [loadOrderData])

  return (
    <div className='w-[99vw] min-h-[100vh] p-5 pb-[150px] bg-[#EFE9E4]'>
      <div className='w-full text-center mt-20'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
      <div className='w-full flex flex-col gap-5 mt-10 text-[#0F0F0F]'>
        {
          orderData.map((item, index) => (
            <div key={index} className='w-full border rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-4 relative flex gap-6 items-start bg-white'>
              <img src={item.image1} alt={item.name} className='w-[130px] h-[130px] rounded-2xl object-cover' />
              <div className='flex flex-col gap-2 flex-grow'>
                <p className='text-2xl font-semibold'>{item.name}</p>
                <div className='flex gap-10 flex-wrap text-lg text-[#9B8C80]'>
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className='text-sm mt-2 text-[#6B655B]'>Date: <span className='text-[#0F0F0F] font-medium'>{new Date(item.date).toDateString()}</span></p>
                <p className='text-sm text-[#6B655B]'>Payment Method: {item.paymentMethod}</p>
              </div>
              <div className='absolute top-6 right-6 flex items-center gap-2'>
                <span className='w-4 h-4 rounded-full bg-green-500'></span>
                <p className='text-lg font-semibold text-[#0F0F0F]'>{item.status}</p>
              </div>
              <button className='absolute bottom-4 right-6 bg-[#0F0F0F] text-[#EFE9E4] py-2 px-4 rounded-full hover:bg-[#9B8C80] transition' onClick={loadOrderData}>Track Order</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
