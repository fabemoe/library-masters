import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Logo from '../graphics/Logo'
import useKeypress from '../hooks/useKeyPress'
import { useAuth } from '../providers/AuthProvider'
import styles from './HomeElement.module.css'
import SearchBar from './SearchBar'
import { useData } from '../providers/DataProvider'

const HomeElement = () => {

    const [searchValue, setSearchValue] = useState("")
    const {isLoggedIn} = useAuth()
    const {books} = useData()

    const {push, replace} = useRouter()

    useKeypress("Enter", () => {
        push({pathname: "/searchresults", query: {query: searchValue.toString()}})
    }, [searchValue])

    const handleSurprise = () => {
        const randomNumber = Math.ceil(Math.random()*10000)%books.length
        const title = books[randomNumber].title
        push("/searchresults" + `?query=${title}`)
    }

    
  return (
    <div className='centered column' style={{
        height: "100%",
        width: "100%",
        gap: "20px"
    }}
    >
        <div
        className={styles.container}
        >
            {/* Header mit Logo */}
            <div
            className='centered'
            >
                <Logo size={55} />
            </div>

            {/* Show All Books Button */}
            <button
            onClick={() => push("/searchresults")}
            style={{
                border: "2px solid black", 
                backgroundColor: "transparent",
                padding: "10px 20px",
                borderRadius: "200px",
                fontWeight: "600",
                width: "fit-content",
            }}
            >
                Show all books
            </button>

            {/* Seperator */}
            <div 
            style={{
                position: "relative",
                height: "2px",
                backgroundColor: "#979797",
                borderRadius: "200px",
                width: "70%"
            }}>
                <div
                className='centered'
                style={{
                    position: "absolute",
                    marginInline: "auto",
                    bottom: 0,
                    top: "-15px",
                    left: 0,
                    right: 0,
                    backgroundColor: "#f5f5f5",
                    height: "30px",
                    width: "70px"
                }}
                >
                    or
                </div>
            </div>

            {/* SearchSection */}
            <div
            className='centered column'
            style={{
                width: "60%",
                gap: "20px"
            }}
            >
                <SearchBar searchValue={searchValue} setSearchValue={(val) => setSearchValue(val)} />
                {/* Button-Section - Master or User */}
                <div className="centered" style={{gap: "10px"}}>
                    {!isLoggedIn ? (
                    <>
                        <button onClick={() => push("/searchresults" + `?query=${searchValue.toString()}`)} style={{backgroundColor: "#277EFF"}} className={styles.button}>
                            Search
                        </button>
                        <button onClick={() => handleSurprise()}   style={{backgroundColor: "#277EFF"}} className={styles.button}>
                            Suprise Me
                        </button>
                    </>
                    ) : (
                        <button onClick={() => push("/searchresults" + `?query=${searchValue.toString()}`)} style={{backgroundColor: "black"}} className={styles.button}>
                            Search
                        </button>
                    )}
                </div>
            </div>

        </div>
        {
            isLoggedIn && (
                <div className='flex stretched-justify' style={{width: "50%"}}>
                   <button className={styles.bottomButton}>
                       Add Book
                   </button>
                   <button className={styles.bottomButton}>
                       Rent/Return
                   </button>
                   <button className={styles.bottomButton}>
                       Customer Management
                   </button>
                </div>
            )
        }
    </div>
  )
}

export default HomeElement