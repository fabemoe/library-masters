import { Dialog, IconButton, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IBook, IBookCopy, ICustomer } from '../providers/DataProvider'
import { CloseRounded, DeleteRounded } from '@mui/icons-material'
import { useAuth } from '../providers/AuthProvider'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { useSnackbar } from 'notistack'
import styles from './DetailDialog.module.css'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import Book from '../components/Book'
import CustomerBook from '../components/CustomerBook'


const CustomerRentedBooks = ({open, customer, onClose} : {open: boolean, customer: ICustomer | null, onClose: () => void}) => {

       
  return (
    <Dialog
    scroll="body"
    open={open}
    onClose={onClose}
    PaperProps={{
        style: {
            borderRadius: "30px",
            minWidth: "70vw"
        }
    }}
    >
        <div
        className="flex column"
        style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            padding: "30px",
        }}
        >
            {/* Header */}
            <div className="flex centered-aligned stretched-justify" style={{gap: "50px", marginBottom: "20px"}}>
                <div className="flex centered-aligned" style={{gap: "10px"}}>
                    <h3>Rented Books - {customer?.name}</h3>
                </div>
                <IconButton onClick={() => onClose()}>
                    <CloseRounded />
                </IconButton>
            </div>
            <div
            className="flex column" style={{gap: "20px"}}
            >
                {
                    customer?.rented.map((book) => (
                        <CustomerBook rented={{from: book.from, to: book.to}} book={book.book} />
                    ))
                }
            </div>
        </div>
    </Dialog>
  )
}

export default CustomerRentedBooks