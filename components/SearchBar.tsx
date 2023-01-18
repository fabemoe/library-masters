import React from 'react'
import styles from './SearchBar.module.css'


const SearchBar = ({searchValue, setSearchValue, style} : {searchValue: string, setSearchValue: (val: string) => void, style?: React.CSSProperties}) => {
  return (
    <div
    style={{
      outline: "none",
      border: "none",
      backgroundColor: "white",
      borderRadius: "1000px",
      width: "100%",
      ...style,

    }}
    >
        <input
        style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            height: "100%",
            width: "100%",
            padding: "17.5px 20px",
        }}
        placeholder="Enter title or ISBN..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
         />
    </div>
  )
}

export default SearchBar