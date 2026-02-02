import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-full min-h-[100vh] p-6 bg-base mt-20'>
      <div className='h-[8%] w-full text-center'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='w-full h-[92%] flex flex-col gap-6 mt-10'>
        {
          cartData.length > 0 ? (
            cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              // ✅ Safe check for undefined
              if (!productData) return null;

              return (
                <div key={index} className='w-full border border-border rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] bg-white p-4 flex flex-col md:flex-row items-center gap-6'>
                  <img className='w-full md:w-[100px] h-[100px] rounded-2xl object-cover' src={productData?.image1 || '/placeholder.png'} alt={productData?.name || 'Product'} />
                  <div className='flex flex-col justify-center gap-2 flex-grow text-center md:text-left'>
                    <p className='text-2xl font-semibold text-primary'>{productData?.name}</p>
                    <div className='flex items-center justify-center md:justify-start gap-4'>
                      <p className='text-xl text-secondary'>{currency} {productData?.price}</p>
                      <p className='w-[40px] h-[40px] flex items-center justify-center bg-base rounded-full text-secondary font-semibold border border-border'>{item.size}</p>
                    </div>
                  </div>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => (e.target.value === '' || e.target.value === '0') ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                    className='w-[60px] py-2 px-3 rounded-full border border-border text-center text-primary bg-base focus:outline-none focus:ring-2 focus:ring-secondary'
                  />
                  <RiDeleteBin6Line
                    className='text-secondary w-7 h-7 cursor-pointer hover:text-red-500 transition-colors'
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  />
                </div>
              )
            })
          ) : (
            <div className="text-center mt-20 text-gray-700">
              <p className="text-xl mb-4">Your cart is empty</p>
              <button
                className="px-6 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-primary transition-all duration-300"
                onClick={() => navigate('/collection')}
              >
                Shop Now
              </button>
            </div>
          )
        }
      </div>

      {/* Cart Summary */}
      {cartData.length > 0 && (
        <div className='flex justify-start items-end my-10'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <button
              className='text-lg hover:bg-secondary cursor-pointer bg-primary py-3 px-12 rounded-full text-white mt-6 border border-transparent hover:border-border transition-all w-full md:w-auto font-semibold shadow-lg'
              onClick={() => {
                if (cartData.length > 0) {
                  navigate("/placeorder");
                } else {
                  console.log("Your cart is empty!");
                }
              }}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
