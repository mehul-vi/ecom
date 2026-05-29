import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
  let { productId } = useParams()
  let { products, currency, addtoCart, loading } = useContext(shopDataContext)
  let [productData, setProductData] = useState(null)

  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const product = products.find(item => item._id === productId)
    if (product) {
      setProductData(product)
      setImage(product.image1)
      setSize('') // reset size selection
    }
  }, [productId, products])

  if (!productData) return <div className='opacity-0'></div>

  return (
    <div className='w-full min-h-[100vh] bg-base flex flex-col pt-24 pb-28 px-4 sm:px-6 gap-8'>
      <div className='flex flex-col lg:flex-row gap-12'>
        <div className='lg:w-1/2 flex flex-col lg:flex-row items-center gap-6'>
          <div className='lg:w-[20%] flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full'>
            {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, i) => (
              <div key={i} className='w-[80px] h-[80px] flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-secondary transition'>
                <img src={img} alt={`Thumb ${i}`} crossOrigin="anonymous" className='w-full h-full object-cover' onClick={() => setImage(img)} />
              </div>
            ))}
          </div>
          <div className='lg:w-[80%] w-full border border-border rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden'>
            <img src={image} alt={productData.name} crossOrigin="anonymous" className='w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover' />
          </div>
        </div>

        <div className='lg:w-1/2 flex flex-col gap-5 text-primary'>
          <h1 className='text-2xl sm:text-3xl font-black tracking-tight'>{productData.name.toUpperCase()}</h1>
          <div className='flex items-center gap-1'>
            {[...Array(4)].map((_, i) => <FaStar key={i} className='text-yellow-400' />)}
            <FaStarHalfAlt className='text-yellow-400' />
            <p className='text-lg font-semibold text-secondary'>(124 reviews)</p>
          </div>
          <p className='text-3xl font-semibold text-secondary'>{currency} {productData.price}</p>
          <p className='text-lg font-medium leading-relaxed text-secondary/90'>{productData.description}</p>
 
          <div className='flex flex-col gap-3 mt-4'>
            <p className='text-xl font-semibold'>Select Size</p>
            <div className='flex flex-wrap gap-3'>
              {productData.sizes.map((s, i) => (
                <button
                  key={i}
                  className={`px-5 py-2 rounded-full border border-border font-medium ${s === size ? 'bg-primary text-white border-primary animate-pulse' : 'bg-white text-primary hover:bg-gray-100'} transition-all`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              className='btn-primary mt-6 w-full py-4 flex items-center justify-center font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!size}
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          <hr className='my-6 border-border' />

          <div className='text-sm text-secondary leading-relaxed font-semibold flex flex-col gap-1'>
            <p>✓ 100% Original Product.</p>
            <p>✓ Cash on delivery is available on this product.</p>
            <p>✓ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      <div className='w-full mt-16 flex flex-col'>
        <div className='flex border-b border-border gap-8'>
          <p className='py-3 text-primary font-bold text-lg border-b-2 border-secondary cursor-pointer'>Description</p>
          <p className='py-3 text-secondary/70 font-semibold cursor-pointer hover:text-primary transition-colors'>Reviews (124)</p>
        </div>

        <div className='bg-white border border-border rounded-2xl text-secondary font-medium p-8 mt-6 shadow-sm leading-relaxed'>
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt, crafted from breathable, high-quality fabric offering all-day comfort and effortless style. Designed for modern living, this piece combines functionality with aesthetic appeal.
          </p>
        </div>

        <div className='mt-12'>
          <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

