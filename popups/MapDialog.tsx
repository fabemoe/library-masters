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



const MapDialog = ({open, onClose} : {open: boolean, onClose: () => void}) => {


    
    
  return (
    <Dialog
    scroll="body"
    open={open}
    onClose={onClose}
    PaperProps={{
        style: {
            borderRadius: "30px",
            minWidth: "30vw",
            minHeight: "30vh"
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
            <img src="/Map.png" style={{width: "100%", height: "100%"}} alt="" />
            
            
           
            
        </div>
    </Dialog>
  )
}

export default MapDialog