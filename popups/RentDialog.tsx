import { Autocomplete, Dialog, IconButton, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IBook, IBookCopy, ICustomer, useData } from '../providers/DataProvider'
import { CloseRounded, DeleteRounded } from '@mui/icons-material'
import { useAuth } from '../providers/AuthProvider'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { useSnackbar } from 'notistack'
import styles from './DetailDialog.module.css'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';



const RentDialog = ({open, customer, onClose} : {open: boolean, customer?: ICustomer, onClose: () => void}) => {


    const {enqueueSnackbar} = useSnackbar()

    const {customers} = useData()

    const [data, setData] = useState<{customer: ICustomer | null, book: string | null}>({
        customer: null,
        book: null
    })
    
    
  return (
    <Dialog
    scroll="body"
    open={open}
    onClose={onClose}
    PaperProps={{
        style: {
            borderRadius: "30px",
            minWidth: "70vw",
            minHeight: "70vh"
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
            <div className="flex centered-aligned stretched-justify" style={{gap: "50px"}}>
                <div className="flex centered-aligned" style={{gap: "10px"}}>

                </div>
                <IconButton onClick={() => onClose()}>
                    <CloseRounded />
                </IconButton>
            </div>
            <div className={"centered column"} style={{gap: "10px", width: "100%", height: "100%"}}>
                <h3>Rent/Return</h3>
                <TextField label="BookID" style={{width: "50%"}} />
                <Autocomplete 
                disablePortal
                id="combo-box-demo"
                options={customers.map((customer) => ({label: customer.name}))}
                sx={{ width: "50%" }}
                renderInput={(params) => <TextField {...params} label="Customer" />}
                />
            </div>
            <div className="flex column centered" style={{marginTop: "20px", gap: "10px"}}>
                <button
                onClick={() => {enqueueSnackbar("Successfully rented out the book", {variant: "success"}); onClose()}}
                style={{
                    padding: "10px 20px",
                    borderRadius: "200px",
                    border: "none",
                    width: "30%",
                    backgroundColor: "#227eff",
                    color: "white"
                }}
                >
                    Rent
                </button>
                <button
                style={{
                    padding: "10px 20px",
                    borderRadius: "200px",
                    border: "2px solid black",
                    width: "30%",
                    backgroundColor: "transparent",
                    color: "black"
                }}
                >
                    Return
                </button>
            </div>
           
            
        </div>
    </Dialog>
  )
}

export default RentDialog