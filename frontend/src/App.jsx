import React, { useCallback, useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/Login'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import ProtectedRoute from './component/ProtectedRoute'

function App() {
  let { userData } = useContext(userDataContext)
  let location = useLocation()

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      <Routes>
        {/* Public Routes - redirect to home if already logged in */}
        <Route path='/login'
          element={userData ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path='/signup'
          element={userData ? <Navigate to="/" replace /> : <Registration />}
        />

        {/* Protected Routes */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />

        <Route path='/about' element={
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        } />

        <Route path='/collection' element={
          <ProtectedRoute>
            <Collections />
          </ProtectedRoute>
        } />

        <Route path='/product' element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />

        <Route path='/contact' element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />

        <Route path='/productdetail/:productId' element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        } />

        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        <Route path='/placeorder' element={
          <ProtectedRoute>
            <PlaceOrder />
          </ProtectedRoute>
        } />

        <Route path='/order' element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        } />

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Ai />
    </>
  )
}

export default App
