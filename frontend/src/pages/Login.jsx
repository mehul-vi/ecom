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
    console.log("Login attempt starting...", { serverUrl, email })

    if (!serverUrl) {
      toast.error("Server URL is missing! Check config.")
      setLoading(false)
      return
    }

    try {
      await axios.post(serverUrl + '/api/auth/login', { email, password }, { withCredentials: true })
      setLoading(false)

      console.log("Fetching current user...")
      const success = await getCurrentUser()
      console.log("getCurrentUser result:", success)

      if (success) {
        toast.success("User Login Successful")
        // Explicitly navigate as a fail-safe, though App.jsx should normally handle it
        navigate("/", { replace: true })
      } else {
        toast.error("Login succeeded but session check failed.")
      }
    } catch (error) {
      console.error("Login Error:", error)
      setLoading(false)
      if (error.response) {
        toast.error(error.response.data.message || "Login Failed: Server Error")
      } else if (error.request) {
        toast.error("Login Failed: No response from server. Check connection.")
      } else {
        toast.error("Login Failed: " + error.message)
      }
    }
  }

  const googlelogin = async () => {
    try {
      setLoading(true);
      const response = await signInWithPopup(auth, provider)
      let user = response.user
      let name = user.displayName;
      let email = user.email
      await axios.post(serverUrl + "/api/auth/googlelogin", { name, email }, { withCredentials: true })
      const success = await getCurrentUser()
      setLoading(false);
      if (success) {
        toast.success("Google Login Successful")
        navigate("/")
      } else {
        toast.error("Google Login succeeded but session failed.")
      }
    } catch (err) {
      setLoading(false);
      console.error("Google Login Error:", err)
      toast.error("Google Login Failed: " + err.message || "Something went wrong")
    }
  }

  return (
    <div className='w-full h-full bg-base text-primary flex flex-col items-center justify-start'>
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
          <div className='w-full h-[50px] bg-base rounded-full flex items-center justify-center gap-4 cursor-pointer hover:bg-gray-200 transition-colors'
            onClick={googlelogin}>
            <img src={google} alt="Google Icon" className='w-6' />
            Login with Google
          </div>

          <div className='flex items-center justify-center gap-4 text-sm text-gray-400'>
            <div className='flex-grow h-[1px] bg-gray-300'></div> OR <div className='flex-grow h-[1px] bg-gray-300'></div>
          </div>

          <div className='relative'>
            <input type="email" placeholder='Email' required
              className='w-full h-12 px-4 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-secondary text-primary font-semibold placeholder:text-gray-400'
              onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>

          <div className='relative'>
            <input type={show ? "text" : "password"} placeholder='Password' required
              className='w-full h-12 px-4 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-secondary text-primary font-semibold placeholder:text-gray-400'
              onChange={(e) => setPassword(e.target.value)} value={password} />
            {!show && <IoEyeOutline className='absolute right-4 top-3.5 cursor-pointer text-gray-500' onClick={() => setShow(true)} />}
            {show && <IoEye className='absolute right-4 top-3.5 cursor-pointer text-gray-500' onClick={() => setShow(false)} />}
          </div>

          <button type='submit' className='w-full h-12 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition flex items-center justify-center'>
            {loading ? <Loading /> : "Login"}
          </button>
          <p className='text-center mt-2'>Don't have an account? <span className='text-secondary font-semibold cursor-pointer hover:underline' onClick={() => navigate("/signup")}>Create New Account</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login