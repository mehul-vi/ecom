import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
  const navigate = useNavigate()
  const { serverUrl } = useContext(authDataContext)
  const { getAdmin, setAdminData } = useContext(adminDataContext)

  const logOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      toast.success("LogOut Successfully")
      setAdminData(null)
      navigate("/login")
    } catch (error) {
      toast.error("LogOut Failed")
    }
  }

  return (
    <nav className="w-full h-[70px] px-6 flex items-center justify-between fixed top-0 left-0 z-20
      bg-[#EFE9E4] shadow-[0_2px_8px_rgba(44,45,69,0.04)] border-b border-[#E6D9CF]">
      <div
        className="flex items-center gap-3 select-none cursor-pointer group"
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="logo" className="w-10 h-10 rounded-xl shadow" />
        <h1 className="text-2xl font-bold tracking-tight text-[#3a332d] group-hover:text-[#2c7b89]">EZ Cart</h1>
      </div>
      <button
        className="text-base rounded-full bg-[#0f0f0f] text-white font-semibold px-6 py-2 transition hover:bg-[#3a332d] shadow active:ring-2 active:ring-[#C8BDB3]"
        onClick={logOut}
      >
        Log Out
      </button>
    </nav>
  )
}

export default Nav
