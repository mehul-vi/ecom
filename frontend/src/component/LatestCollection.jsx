import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  let { products } = useContext(shopDataContext)
  let [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products])

  return (
    <div>
      <div className='text-center md:mt-12'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='max-w-xl mx-auto text-secondary text-lg px-4'>Step Into Style – New Collection Dropping This Season!</p>
      </div>
      <div className='mt-8 flex flex-wrap justify-center gap-12 px-6'>
        {latestProducts.map((item, index) => (
          <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection
