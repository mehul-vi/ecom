import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'

const ProtectedRoute = ({ children }) => {
    const { userData, isLoading } = useContext(userDataContext)
    const location = useLocation()

    if (isLoading) {
        // You can replace this with a proper loading spinner component
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (!userData) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />
    }

    return children
}

export default ProtectedRoute
