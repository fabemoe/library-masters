import React from 'react'
import { IBook } from '../providers/DataProvider'

const Book = ({book} : {book: IBook}) => {
  return (
    <div
    className='flex'
    style={{
        width: "80%",
        backgroundColor: "#f5f5f5",
        borderRadius: "30px",
        height: "300px",
        padding: "30px"
    }}
    >
        <div
        style={{
            width: "15%",
            height: "100%",
            borderRadius: "20px",
            overflow: "hidden"
        }}
        >
            <img src={book.imageURL} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }} alt="" />
        </div>
        {book.title}
    </div>
  )
}

export default Book