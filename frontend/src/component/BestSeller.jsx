import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
  let { products } = useContext(shopDataContext)
  let [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestseller)
    setBestSeller(filterProduct.slice(0, 4));
  }, [products])

  return (
    <div className='py-8 bg-base'>
      <div className='h-[8%] w-full text-center'>
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className='w-full max-w-xl m-auto text-base text-secondary mt-2 px-4'>
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>
      </div>
      <div className='w-full mt-8 flex items-center justify-center flex-wrap gap-12 px-8'>
        {
          bestSeller.map((item, index) => (
            <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1} />
          ))
        }
      </div>
    </div>
  )
}

export default BestSeller
