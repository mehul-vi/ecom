import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
  let [method, setMethod] = useState('cod')
  let navigate = useNavigate()
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)
  let [loading, setLoading] = useState(false)

  let [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setFormData(data => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true })
        if (data) {
          navigate("/order")
          setCartItem({})
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let orderItems = []
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItem[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }
      switch (method) {
        case 'cod': {
          const result = await axios.post(serverUrl + "/api/order/placeorder", orderData, { withCredentials: true })
          if (result.data) {
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)
          } else {
            toast.error("Order Placed Error")
            setLoading(false)
          }
          break;
        }
        case 'razorpay': {
          const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay", orderData, { withCredentials: true })
          if (resultRazorpay.data) {
            initPay(resultRazorpay.data)
            toast.success("Order Placed")
            setLoading(false)
          }
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='w-full min-h-[100vh] bg-[#EFE9E4] flex flex-col md:flex-row items-center justify-center gap-12 p-8'>
      <div className='lg:w-1/2 w-full'>
        <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          <div className='grid grid-cols-2 gap-6 mt-6'>
            <input type="text" placeholder='First name' name='firstName' required value={formData.firstName} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='Last name' name='lastName' required value={formData.lastName} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="email" placeholder='Email address' name='email' required value={formData.email} onChange={onChangeHandler} className='col-span-2 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='Street' name='street' required value={formData.street} onChange={onChangeHandler} className='col-span-2 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='City' name='city' required value={formData.city} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='State' name='state' required value={formData.state} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='Pincode' name='pinCode' required value={formData.pinCode} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='Country' name='country' required value={formData.country} onChange={onChangeHandler} className='col-span-1 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
            <input type="text" placeholder='Phone' name='phone' required value={formData.phone} onChange={onChangeHandler} className='col-span-2 h-12 px-4 border border-[#C8BDB3] rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80]' />
          </div>

          <button type='submit' disabled={loading} className='mt-6 w-full py-3 bg-[#0F0F0F] text-[#C8BDB3] font-semibold rounded-full hover:bg-[#9B8C80] transition flex justify-center items-center'>
            {loading ? <Loading /> : "PLACE ORDER"}
          </button>
        </form>
      </div>
      <div className='lg:w-1/2 w-full flex flex-col items-center gap-8'>
        <CartTotal />
        <Title text1={'PAYMENT'} text2={'METHOD'} />
        <div className='flex gap-8'>
          <button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-2xl border-4 ${method === 'razorpay' ? 'border-blue-900' : 'border-transparent'} overflow-hidden`}>
            <img src={razorpay} alt="Razorpay" className='w-full h-full object-cover rounded-2xl' />
          </button>
          <button onClick={() => setMethod('cod')} className={`w-[200px] h-[50px] rounded-2xl font-bold ${method === 'cod' ? 'bg-gradient-to-t from-[#95b3f8] to-[white] border-4 border-blue-900' : 'bg-gradient-to-t from-[#ebe9f7] to-[#c8bfd9] text-[#332f6f]'}`}>
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
