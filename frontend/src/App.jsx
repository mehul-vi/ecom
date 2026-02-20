

import React, { useContext, Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import { ToastContainer } from 'react-toastify';
import Ai from './component/Ai'
import ProtectedRoute from './component/ProtectedRoute'
import Loading from './component/Loading'

// Lazy Load Pages
const Registration = lazy(() => import('./pages/Registration'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const About = lazy(() => import('./pages/About'));
const Collections = lazy(() => import('./pages/Collections'));
const Product = lazy(() => import('./pages/Product'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Order = lazy(() => import('./pages/Order'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  let { userData } = useContext(userDataContext)

  return (
    <>
      <ToastContainer />
      {userData && <Nav />}
      <Suspense fallback={<Loading />}>
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
      </Suspense>
      <Ai />
    </>
  )
}

export default App
