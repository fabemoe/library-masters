import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '../providers/AuthProvider'

const Header = () => {

    const {pathname} = useRouter()
    const {isLoggedIn} = useAuth()

    console.log(pathname)
    
  return (
    <div
    className='flex centered-aligned'
    style={{
        height: "50px",
        justifyContent: pathname == "/searchresults" ? undefined : "flex-end"
    }}
    >
        <button>
            {
                isLoggedIn ? "Logout" : "Login"
            }
        </button>
    </div>
  )
}

export default Header