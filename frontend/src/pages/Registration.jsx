import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';

function Registration() {
  let [show, setShow] = useState(false)
  let { serverUrl } = useContext(authDataContext)
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { getCurrentUser } = useContext(userDataContext)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(serverUrl + '/api/auth/registration', { name, email, password }, { withCredentials: true })
      await getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("User Registration Failed")
    }
  }

  const googleSignup = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      await getCurrentUser()
      navigate("/")
      toast.success("User Registration Successful")
    } catch (error) {
      toast.error("User Registration Failed")
    }
  }

  return (
    <div className='w-full h-full bg-[#EFE9E4] text-[#0F0F0F] flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-10' src={Logo} alt="OneCart Logo" />
        <h1 className='text-2xl font-bold'>OneCart</h1>
      </div>
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-2'>
        <span className='text-3xl font-semibold'>Registration Page</span>
        <span className='text-lg'>Welcome to OneCart, Place your order</span>
      </div>
      <div className='max-w-xl w-11/12 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8'>
        <form onSubmit={handleSignup} className='flex flex-col gap-6'>
          <div className='w-full h-[50px] bg-[#F5F2EF] rounded-full flex items-center justify-center gap-4 cursor-pointer hover:bg-[#E6D9CF]'
            onClick={googleSignup}>
            <img src={google} alt="Google Icon" className='w-6' />
            Registration with Google
          </div>

          <div className='flex items-center justify-center gap-4 text-sm text-gray-400'>
            <div className='flex-grow h-[1px] bg-gray-300'></div> OR <div className='flex-grow h-[1px] bg-gray-300'></div>
          </div>

          <input type="text" required placeholder='UserName' className='w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80] text-[#0F0F0F] font-semibold'
            onChange={(e) => setName(e.target.value)} value={name} />
          <input type="email" required placeholder='Email' className='w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80] text-[#0F0F0F] font-semibold'
            onChange={(e) => setEmail(e.target.value)} value={email} />
          <div className='relative'>
            <input type={show ? "text" : "password"} required placeholder='Password' className='w-full h-12 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#9B8C80] text-[#0F0F0F] font-semibold'
              onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show && <IoEyeOutline className='absolute right-4 top-3.5 cursor-pointer text-gray-600' onClick={() => setShow(true)} />}
            {show && <IoEye className='absolute right-4 top-3.5 cursor-pointer text-gray-600' onClick={() => setShow(false)} />}
          </div>

          <button type='submit' disabled={loading} className='w-full h-12 bg-[#0F0F0F] text-[#EFE9E4] rounded-full font-semibold hover:bg-[#9B8C80] transition flex items-center justify-center'>
            {loading ? <Loading /> : "Create Account"}
          </button>

          <p className='text-center'>
            Already have an account? <span className='text-[#5555f6cf] font-semibold cursor-pointer' onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Registration
