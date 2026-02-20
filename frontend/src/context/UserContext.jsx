import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'  // 👈 Make sure file name matches exactly
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState(null)
  const { serverUrl } = useContext(authDataContext)

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true,
      })
      setUserData(result.data)
      console.log('Current User:', result.data)
      return true
    } catch (error) {
      setUserData(null)
      console.error('Error fetching current user:', error)
      return false
    }
  }

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
