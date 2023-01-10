import React, { createContext, ReactNode, useContext } from 'react'

interface IAuthContext {
    isLoggedIn: boolean
}

const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false
})

const AuthProvider = ({children} : {children: ReactNode}) => {


    
  return (
    <AuthContext.Provider
    value={{
        isLoggedIn: true
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)