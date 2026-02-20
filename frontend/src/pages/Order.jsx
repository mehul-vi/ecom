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
    <div className='w-full min-h-[100vh] p-6 pb-[150px] bg-base'>
      <div className='w-full text-center mt-20'>
        <Title text1={'MY'} text2={'ORDER'} />
      </div>
      <div className='w-full flex flex-col gap-6 mt-10 text-primary'>
        {
          orderData.map((item, index) => (
            <div key={index} className='w-full border border-border rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 relative flex flex-col md:flex-row gap-6 items-start bg-white transition-all hover:shadow-lg'>
              <img src={item.image1} alt={item.name} className='w-[130px] h-[130px] rounded-2xl object-cover' />
              <div className='flex flex-col gap-2 flex-grow'>
                <p className='text-2xl font-bold'>{item.name}</p>
                <div className='flex gap-6 flex-wrap text-lg text-secondary font-medium'>
                  <p>{currency} {item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div className="mt-2 text-sm text-gray-500 flex flex-col gap-1">
                  <p>Date: <span className='text-primary font-medium'>{new Date(item.date).toDateString()}</span></p>
                  <p>Payment Method: <span className='font-medium text-primary'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='absolute md:static top-6 right-6 flex items-center gap-2'>
                <span className={`w-3 h-3 rounded-full ${item.status === 'Delivered' ? 'bg-green-500' : 'bg-secondary'}`}></span>
                <p className='text-lg font-semibold text-primary'>{item.status}</p>
              </div>
              <button className='absolute bottom-6 right-6 md:static bg-primary text-white py-2 px-6 rounded-full hover:bg-secondary transition shadow-md' onClick={loadOrderData}>Track Order</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Order
