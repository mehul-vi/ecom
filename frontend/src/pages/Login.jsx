import React, { useState, useContext } from 'react'
import Logo from "../assets/logo.png"
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { toast } from 'react-toastify';

function Login() {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext)
  let { getCurrentUser } = useContext(userDataContext)
  let [loading, setLoading] = useState(false)
  let navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let result = await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
      setLoading(false)
      const success = await getCurrentUser()
      if (success) {
        toast.success("User Login Successful")
        // Navigate handled by App.jsx based on userData
      } else {
        toast.error("Login succeeded but session failed. Check cookies.")
      }
    } catch (error) {
      setLoading(false)
      toast.error("User Login Failed")
    }
  }

  const googlelogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email
      const result = await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      const success = await getCurrentUser()
      if (!success) {
        toast.error("Google Login succeeded but session failed.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='w-full h-full bg-[#EFE9E4] text-[#0F0F0F] flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center px-8 gap-4 cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-10' src={Logo} alt="OneCart Logo" />
        <h1 className='text-2xl font-bold'>OneCart</h1>
      </div>

      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-2'>
        <span className='text-3xl font-semibold'>Login Page</span>
        <span className='text-lg'>Welcome to OneCart, Place your order</span>
      </div>

      <div className='max-w-xl w-11/12 bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8'>
        <form onSubmit={handleLogin} className='flex flex-col gap-6'>
          <div className='w-full h-[50px] bg-[#F5F2EF] rounded-full flex items-center justify-center gap-4 cursor-pointer hover:bg-[#E6D9CF]'
            onClick={googlelogin}>
            <img src={google} alt="Google Icon" className='w-6' />
            Login with Google
          </div>

          <div className='flex items-center justify-center gap-4 text-sm text-gray-400'>
            <div className='flex-grow h-[1px] bg-gray-300'></div> OR <div className='flex-grow h-[1px] bg-gray-300'></div>
          </div>

          <div className='relative'>
            <input type="email" placeholder='Email' required
              className='w-full h-12 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] text-[#0F0F0F] font-semibold'
              onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='relative'>
            <input type={show ? "text" : "password"} placeholder='Password' required
              className='w-full h-12 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] text-[#0F0F0F] font-semibold'
              onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show && <IoEyeOutline className='absolute right-4 top-3.5 cursor-pointer text-gray-600' onClick={() => setShow(true)} />}
            {show && <IoEye className='absolute right-4 top-3.5 cursor-pointer text-gray-600' onClick={() => setShow(false)} />}
          </div>

          <button type='submit' className='w-full h-12 bg-[#0F0F0F] text-[#EFE9E4] rounded-full font-semibold hover:bg-[#9B8C80] transition flex items-center justify-center'>
            {loading ? <Loading /> : "Login"}
          </button>
          <p className='text-center mt-2'>Don't have an account? <span className='text-[#5555f6cf] font-semibold cursor-pointer' onClick={() => navigate("/signup")}>Create New Account</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login
