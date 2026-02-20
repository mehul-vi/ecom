import React from 'react'

function Loading() {
  return (
    <div className='flex items-center justify-center min-h-[50vh] w-full'>
      <div className="animate-spin h-12 w-12 border-4 border-secondary border-t-transparent rounded-full shadow-md"></div>
    </div>
  )
}

export default Loading
