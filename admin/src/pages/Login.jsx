import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from 'react-icons/io5'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin } = useContext(adminDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/adminlogin`,
        { email, password },
        { withCredentials: true }
      )
      const success = await getAdmin()
      if (success) {
        toast.success('Admin login successful')
        // Navigation handled by App.jsx or effect
        navigate('/')
      } else {
        toast.error('Login succeeded but admin session failed.')
      }
    } catch (error) {
      toast.error('Admin login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-[#EFE9E4] text-[#2b2622] flex flex-col items-center">
      <div className="w-full h-20 flex items-center gap-3 px-6">
        <img className="w-9 h-9" src={logo} alt="OneCart" />
        <h1 className="text-xl font-semibold">OneCart</h1>
      </div>

      <div className="text-center mt-6 mb-6">
        <h2 className="text-3xl font-semibold text-[#3a332d]">Admin Login</h2>
        <p className="text-[#9B8C80] mt-2">Welcome back. Sign in to continue.</p>
      </div>

      <div className="w-[92%] max-w-md bg-white border border-[#E6D9CF] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6">
        <form onSubmit={AdminLogin} className="grid gap-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-[#4b453f] font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-12 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-4 placeholder:text-[#9B8C80]"
              placeholder="admin@onecart.com"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-2 text-[#4b453f] font-medium">
              Password
            </label>
            <input
              id="password"
              type={show ? 'text' : 'password'}
              className="w-full h-12 rounded-xl bg-[#F5F2EF] border border-[#E6D9CF] focus:outline-none focus:ring-2 focus:ring-[#C8BDB3] px-4 pr-10 placeholder:text-[#9B8C80]"
              placeholder="••••••••"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button
              type="button"
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-10 text-[#9B8C80]"
              onClick={() => setShow((p) => !p)}
            >
              {show ? <IoEye size={20} /> : <IoEyeOutline size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-2 rounded-full bg-[#0f0f0f] text-white font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
