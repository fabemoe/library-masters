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


const CustomerDetailDialog = ({open, customer, onClose, mode} : {open: boolean, customer: ICustomer | null, onClose: () => void, mode: "edit" | "show" | "add"}) => {

    const [modalMode, setModalMode] = useState(mode)

    const {enqueueSnackbar} = useSnackbar()


    useEffect(() => {
        setModalMode(mode)
    }, [mode])
    
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
            <div className="flex centered-aligned stretched-justify" style={{gap: "50px"}}>
                <div className="flex centered-aligned" style={{gap: "10px"}}>
                    <h3>{modalMode == "edit" ? customer?.name : modalMode == "show" ? customer?.name : "Add Customer"}</h3>
                </div>
                <IconButton onClick={() => onClose()}>
                    <CloseRounded />
                </IconButton>
            </div>
            {/* Content */}
            <div className="flex" style={{marginTop: "20px", gap: "20px", width: "100%"}}>
                {/* Left */}
                <div
                style={{
                    height: "10%",
                    width: "20%",
                    aspectRatio: "1/1",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "20px"
                }}
                className="centered"
                >
                    <Person2RoundedIcon />
                </div>
                {/* Right */}
                <div className="flex column" style={{padding: "10px 20px", gap: "5px", overflowY: "scroll", width: "60%"}}>
                    {modalMode == "show" ? (<h4>
                        {customer?.name}
                    </h4>)
                    :
                    (
                        <TextField size="small" variant="filled" label="Name"  value={customer?.name} />
                    )
                    }
                    {modalMode == "show" ? (<span style={{color: "#c9c9c9"}}>{customer?.street}</span>)
                    :
                    (
                        <TextField size="small" variant="filled" label="Street" value={customer?.street} />
                    )
                    }
                    {modalMode == "show" ? (<span>
                        {customer?.zip} Pages
                    </span>)
                    :
                    (
                        <TextField type="number" value={customer?.zip} label="Postal Code" variant="filled" />
                    )
                    }
                    {modalMode == "show" ? (<span>
                        Year: {customer?.email}
                    </span>)
                    :
                    (
                        <TextField value={customer?.email} label="EMail" variant="filled" />
                    )
                    }
                    {modalMode == "show" ? (<span>
                        Genre: Fantasy
                    </span>)
                    :
                    (
                        <TextField variant="filled" value={customer?.houseNumber} label="House Number" />
                    )
                    }
                    <TextField variant="filled" value={customer?.town} label="Town" />
                </div>
            </div>
            <div className="flex centered-aligned" style={{justifyContent: "flex-end", marginTop: "20px"}}>
                {(modalMode == "edit" || modalMode == "add") && (<div
                className="flex centered-aligned"
                style={{
                    gap: "10px"
                }}
                >
                    <button
                    onClick={() => modalMode == "add" ? onClose() : onClose()}
                    style={{
                        backgroundColor: "#e4e4e4",
                        padding: "12px 22px",
                        borderRadius: "100px",
                        border: "none",
                    }}
                    >
                    Cancel
                    </button>
                    <button
                    style={{
                        backgroundColor: "#277EFF",
                        padding: "12px 22px",
                        borderRadius: "100px",
                        border: "none",
                        color: "white"
                    }}
                    onClick={() => {enqueueSnackbar(modalMode == "edit" ? "Successfully edited " + customer?.name : "Successfully added customer", {variant: "success"}); modalMode == "edit" ? onClose() : onClose()}}
                    >
                    Save
                    </button>
                </div>)}
            </div>
        </div>
    </Dialog>
  )
}

export default CustomerDetailDialog