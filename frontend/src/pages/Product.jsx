import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full min-h-[100vh] bg-base flex flex-col items-center py-6 gap-12'>
      <div className='w-full flex flex-col items-center gap-6'>
        <LatestCollection />
      </div>
      <div className='w-full flex flex-col items-center gap-6'>
        <BestSeller />
      </div>
    </div>
  )
}

export default Product
