import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, { withCredentials: true })
      setTotalProducts(products.data?.length || 0)

      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      setTotalOrders(orders.data?.length || 0)
    } catch (err) {
      // keep UI usable, show zeros
      setTotalProducts(0)
      setTotalOrders(0)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  const StatCard = ({ label, value }) => (
    <div className="text-[#3a332d] w-full md:w-[360px] h-[180px] bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 flex flex-col justify-between">
      <span className="text-lg text-[#9B8C80]">{label}</span>
      <span className="text-4xl font-semibold">{value}</span>
      <div className="h-2 w-full bg-[#F5F2EF] rounded-full overflow-hidden">
        <div className="h-full bg-[#0f0f0f] rounded-full" style={{ width: '100%' }} />
      </div>
    </div>
  )

  return (
    <div className="w-screen min-h-screen bg-[#EFE9E4] text-[#2b2622] relative">
      <Nav />
      <Sidebar />

      <div className="lg:ml-[320px] md:ml-[240px] px-4 md:px-8 pt-24 pb-16">
        <h1 className="text-3xl md:text-4xl font-semibold text-[#3a332d] mb-8">ZOVO Admin</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <StatCard label="Total Products" value={totalProducts} />
          <StatCard label="Total Orders" value={totalOrders} />
        </div>
      </div>
    </div>
  )
}

export default Home
