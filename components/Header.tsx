import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { ArrowBackRounded } from '@mui/icons-material'
import SearchBar from './SearchBar'
import useKeypress from '../hooks/useKeyPress'

const Header = () => {

    const {pathname, back, query, replace} = useRouter()
    const {isLoggedIn, setIsLoggedIn} = useAuth()
    const [searchValue, setSearchValue] = useState("")


    useKeypress("Enter", (val) => {
        if (pathname == "/searchresults") {
            replace("/searchresults" + `?query=${searchValue}`, {query: {query: searchValue}}, {shallow: false})
        }
    }, [searchValue])
    
    useEffect(() => {
        //@ts-ignore
        setSearchValue(query.query ?? "")
    }, [query])

    
  return (
    <div
    className='flex centered-aligned'
    style={{
        minHeight: "50px",
        justifyContent: pathname == "/searchresults" ? "space-between" : "flex-end",
        position: "sticky",
        top:0,
        width: "100%",
        backgroundColor: "white",
        paddingInline: "30px",
        paddingBlock: "15px"
    }}
    >
        {/* Left Section */}
        {pathname != "/" &&(<div
        className='flex centered-aligned'
        style={{
            gap: "10px"
        }}
        >
            <button
            onClick={() => back()}
            className='centered'
            style={{
                borderRadius: "1000px",
                padding: "10px",
                border: "none"
            }}
            >
                <ArrowBackRounded />
            </button>
            <SearchBar style={{backgroundColor: "#f5f5f5", width: "350px"}} searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>)}
        <div>
            <button
            onClick={() => setIsLoggedIn(isLoggedIn ? false : true)}
            >
                {
                    isLoggedIn ? "Logout" : "Login"
                }
            </button>
        </div>
    </div>
  )
}

export default Header