import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn')
    return storedLoggedIn === 'true'
  })

  const [username, setUsername] = useState(() => {
    const storedUsername = localStorage.getItem('username')
    return storedUsername
  })

  const login = (username) => {
    setIsLoggedIn(true)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('username', username)
  }
  const logout = () => {
    setIsLoggedIn(false)
    localStorage.setItem('isLoggedIn', 'false')
  }

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn')
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  )
}
