import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authDataContext } from './AuthContext'  // 👈 Make sure file name matches exactly
import axios from 'axios'

export const userDataContext = createContext()

function UserContext({ children }) {
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { serverUrl } = useContext(authDataContext)

  const getCurrentUser = useCallback(async () => {
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
    } finally {
      setIsLoading(false)
    }
  }, [serverUrl])

  useEffect(() => {
    getCurrentUser()
  }, [getCurrentUser])

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    isLoading,
    serverUrl
  }

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext
