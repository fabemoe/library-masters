import React from 'react'
import { IBook, ICustomer } from '../providers/DataProvider'
import { useAuth } from '../providers/AuthProvider'
import { DeleteRounded, EditRounded, MoreHorizRounded, MoreRounded } from '@mui/icons-material'
import styles from './Book.module.css'
import { usePopUps } from '../providers/PopUpProvider'
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';

const Customer = ({customer} : {customer: ICustomer}) => {

    const {isLoggedIn} = useAuth()
    const {openCustomerDetails, openRentedBooks} = usePopUps()
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
            overflow: "hidden",
            backgroundColor: "#e4e4e4"
        }}
        className="centered"
        >
            <Person2RoundedIcon />
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
                        {customer.name}
                    </span>
                    <span
                    style={{
                        color: "#959595"
                    }}
                    >
                        {customer.street + " " + customer.houseNumber}
                    </span>
                    <span
                    style={{
                        color: "#959595"
                    }}
                    >
                        {
                        customer.zip + " " + customer.town
                    }
                    </span>
                    <span
                    style={{
                        color: "#959595"
                    }}
                    >
                        {
                        customer.email
                    }
                    </span>
                </div>
                <span
                style={{
                    color: "#c9c9c9",
                    fontSize: "12px"
                }}
                >
                    {
                        "ID: " + customer.id
                    }
                </span>
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
                            onClick={() => openCustomerDetails(customer, "edit")}
                            className={'centered ' + styles.button}
                            >
                                <EditRounded fontSize='inherit' />
                                Edit
                            </button>
                            <button
                            onClick={() => openRentedBooks(customer)}
                            className={'centered ' + styles.button}
                            >
                                <MoreHorizRounded fontSize='inherit'/>
                                Rented Books
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

export default Customer