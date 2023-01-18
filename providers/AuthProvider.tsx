import React, { createContext, ReactNode, useContext, useState } from 'react'

interface IAuthContext {
    isLoggedIn: boolean
    setIsLoggedIn: (val: boolean) => void
}

const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    setIsLoggedIn: (val) => null
})

const AuthProvider = ({children} : {children: ReactNode}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
    
  return (
    <AuthContext.Provider
    value={{
        isLoggedIn,
        setIsLoggedIn
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)