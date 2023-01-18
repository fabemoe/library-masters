import React from 'react'
import { IBook } from '../providers/DataProvider'
import { useAuth } from '../providers/AuthProvider'
import { DeleteRounded, EditRounded, MoreHorizRounded, MoreRounded } from '@mui/icons-material'
import styles from './Book.module.css'

const Book = ({book} : {book: IBook}) => {

    const {isLoggedIn} = useAuth()
  return (
    <div
    className='flex'
    style={{
        width: "100%",
        backgroundColor: "#f5f5f5",
        borderRadius: "30px",
        height: "300px",
        padding: "30px"
    }}
    >
        <div
        style={{
            width: "20%",
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

        {/* Linke Seite des Buches */}
        <div
        className='flex centered-aligned stretched-justify'
        style={{
            padding: "30px 15px 30px 60px",
            width: "100%",
            gap: "40px"
        }}
        >
            <div className='flex column stretched-align'
            style={{
                height: "100%",
                flexWrap: "unset",
                width: "20%"
            }}
            >
                <div
                style={{height: "100%", gap: "5px"}}
                className='flex column'
                >
                    <span
                    style={{
                        fontSize: "22px",
                        fontWeight: "600"
                    }}
                    >
                        {book.title}
                    </span>
                    <span
                    style={{
                        color: "#959595"
                    }}
                    >
                        {book.author}
                    </span>
                    <span
                    style={{
                        padding: "4px 10px",
                        width: "fit-content",
                        borderRadius: "100px",
                        backgroundColor: book.copies.length > 0 ? "lightgreen" : "red"
                    }}
                    >
                        {book.copies.length}x available
                    </span>
                </div>
                <span
                style={{
                    color: "#c9c9c9",
                    fontSize: "12px"
                }}
                >
                    ISBN: {book.isbn ?? "123"}
                </span>
            </div>

            {/* Description */}
            <div
            className='flex column'
            style={{
                width: "40%",
                height: "100%",
                gap: "5px"
            }}
            >
                <span
                style={{
                    fontSize: "12px",
                    color: "#959595"
                }}
                >Description:</span>
                <p>
                    {book.description}
                </p>
            </div>

            {/* Button-Section */}
            <div
            className='flex column'
            style={{
                gap: "7px"
            }}
            >
                {
                    isLoggedIn ? (
                        <>
                            <button
                            className={'centered ' + styles.button}
                            >
                                <EditRounded fontSize='inherit' />
                                Edit
                            </button>
                            <button
                            className={'centered ' + styles.button}
                            >
                                <MoreHorizRounded fontSize='inherit'/>
                                Show details
                            </button>
                            <button
                            className={'centered ' + styles.button}
                            style={{
                                backgroundColor: "lightpink",
                                color: "red"
                            }}
                            >
                                <DeleteRounded fontSize='inherit'/>
                                Delete
                            </button>
                        </>
                    )
                    :
                    (
                        <>
                            <button
                            className={'centered ' + styles.button}
                            >
                                <MoreHorizRounded fontSize='inherit'/>
                                Show details
                            </button>
                        </>
                    )
                }
            </div>
            
        </div>
    </div>
  )
}

export default Book