import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  let navigate = useNavigate()
  return (
    <div className='w-full min-h-screen bg-base flex flex-col items-center justify-center gap-10 text-primary text-6xl font-bold'>
      404 Page Not Found
      <button className='bg-primary px-8 py-4 rounded-full text-white text-lg hover:bg-secondary transition shadow-lg'
        onClick={() => navigate("/login")}>Login</button>
    </div>
  )
}

export default NotFound
