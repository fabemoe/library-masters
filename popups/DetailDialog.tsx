import { Dialog, IconButton, TextField, TextareaAutosize } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IBook, IBookCopy } from '../providers/DataProvider'
import { CloseRounded, DeleteRounded } from '@mui/icons-material'
import { useAuth } from '../providers/AuthProvider'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import LocalMallRoundedIcon from '@mui/icons-material/LocalMallRounded';
import { useSnackbar } from 'notistack'
import styles from './DetailDialog.module.css'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { usePopUps } from '../providers/PopUpProvider'

const Detail = ({copy} : {copy: IBookCopy}) => {
    const {isLoggedIn} = useAuth()

    const {openMap } = usePopUps()
    
    return (
        <div
        style={{
            width: "100%",
            backgroundColor: "#f5f5f5",
            padding: "15px 20px"
        }}
        className="flex centered-aligned stretched-justify"
        >
            <div className="flex centered-aligned" style={{gap: "5px", fontSize: "0.8rem"}}>

            {
                isLoggedIn && (<IconButton><DeleteRounded fontSize="small" style={{color: "red"}} /></IconButton>)
            }
            <span>
                ID: {copy.id}
            </span>
            <span>
                Location: {copy.location > 50 ? "Line 1/Floor 7" : "Line 2/Floor 2"}
            </span>
            </div>
            <div className="flex centered-aligned" style={{gap: "10px"}}>
                <span
                style={{
                    padding: "4px 10px",
                    width: "fit-content",
                    borderRadius: "100px",
                    backgroundColor: copy.availability == 1 ? "lightgreen" : "lightpink"
                }}
                >{copy.availability == 0 ? "unavailable" : "available"}</span>
                {!isLoggedIn ? (<button className="centered" style={{gap: "5px", padding: "3px 10px", borderRadius: "100px"}}
                onClick={() => openMap()}
                >
                    <LocationOnRoundedIcon fontSize="small" />
                    Location
                </button>)
                :
                (
                    <button className="centered" style={{gap: "5px", padding: "3px 10px", borderRadius: "100px"}}>
                        <LocalMallRoundedIcon fontSize="small" />
                        Rent
                    </button>
                )}
            </div>
        </div>
    )
}

const DetailDialog = ({open, book, onClose, mode} : {open: boolean, book: IBook | null, onClose: () => void, mode: "edit" | "show" | "add"}) => {

    const [modalMode, setModalMode] = useState(mode)

    const {enqueueSnackbar} = useSnackbar()

    const {isLoggedIn} = useAuth()

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
                    {(isLoggedIn && modalMode == "show") && (<button
                    onClick={() => setModalMode("edit")}
                    style={{
                        padding: "8px 18px",
                        borderRadius: "100px",
                        border: "none",
                        backgroundColor: "black",
                        color: "white"
                    }}
                    >
                        Edit Book
                    </button>)}
                    <h3>{modalMode == "edit" ? "Edit book" : modalMode == "show" ? "Book details" : "Add Book"}</h3>
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
                >
                    <img src={book?.imageURL} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                </div>
                {/* Right */}
                <div className="flex column" style={{padding: "10px 20px", gap: "5px", overflowY: "scroll", width: "60%"}}>
                    {modalMode == "show" ? (<h4>
                        {book?.title}
                    </h4>)
                    :
                    (
                        <TextField size="small" variant="filled" label="Title"  value={book?.title} />
                    )
                    }
                    {modalMode == "show" ? (<span style={{color: "#c9c9c9"}}>{book?.author}</span>)
                    :
                    (
                        <TextField size="small" variant="filled" label="Author" value={book?.author} />
                    )
                    }
                    {modalMode == "show" && (<span
                    style={{
                        padding: "4px 10px",
                        width: "fit-content",
                        borderRadius: "100px",
                        backgroundColor: "lightgreen"
                    }}
                    >
                    {book?.copies.filter((copy) => copy.availability == 1).length}x available
                    </span>)}
                    {modalMode == "show" ? (<span>
                        {book?.page_count} Pages
                    </span>)
                    :
                    (
                        <TextField type="number" value={book?.page_count} label="Pages" variant="filled" />
                    )
                    }
                    {modalMode == "show" ? (<span>
                        Year: {book?.publish_date}
                    </span>)
                    :
                    (
                        <TextField type="number" value={book?.publish_date} label="Year" variant="filled" />
                    )
                    }
                    {modalMode == "show" ? (<span>
                        Genre: Fantasy
                    </span>)
                    :
                    (
                        <TextField variant="filled" value={modalMode == "add" ? "" : "Fantasy"} label="Genre" />
                    )
                    }
                </div>
            </div>
            <div className="flex column" style={{marginBlock: "20px"}}>
                <span>
                    Description:
                </span>
                {modalMode == "show" ? (<p>
                    {book?.description}
                </p>)
                :
                (
                    <TextareaAutosize placeholder="Description" value={book?.description} className={styles.input} />
                )}
                <span style={{marginTop: "20px"}}>Publisher:</span>
                {modalMode == "show" ? (<a href="https://expample-publisher.com">Example Publisher</a>) : (
                    <TextField style={{width: "fit-content"}} value={modalMode == "add" ? "" : "Example Publisher"} variant="filled" label="Publisher" />
                )}
            </div>
            {/* Copies */}
            <div>
                <span style={{marginBottom: "10px"}}>Copies:</span>
                {
                    (modalMode == "edit" || modalMode == "add") && (
                        <button className="centered" style={{borderRadius: "200px", padding: "5px 10px", border: "none", backgroundColor: "#e4e4e4", marginTop: "10px"}}>
                            <AddCircleOutlineRoundedIcon fontSize="small" />
                            Add Copy
                        </button>
                    )
                }
                <div className="flex column" style={{gap: "6px", overflow: "scroll", height: "200px", marginTop: "10px"}}>
                    {book?.copies.map((copy) => (
                        <Detail copy={copy} />
                    ))}
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
                    onClick={() => modalMode == "add" ? onClose() : setModalMode("show")}
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
                    onClick={() => {enqueueSnackbar(modalMode == "edit" ? "Successfully edited " + book?.title : "Successfully added book", {variant: "success"}); modalMode == "edit" ? setModalMode("show") : onClose()}}
                    >
                    Save
                    </button>
                </div>)}
            </div>
        </div>
    </Dialog>
  )
}

export default DetailDialog