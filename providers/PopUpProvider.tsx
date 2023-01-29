import React, { ReactNode, createContext, useContext, useState } from 'react'
import DetailDialog from '../popups/DetailDialog'
import { IBook, ICustomer } from './DataProvider'
import CustomerDetailDialog from '../popups/CustomerDetails'
import CustomerRentedBooks from '../popups/CustomerRentedBooks'
import RentDialog from '../popups/RentDialog'
import MapDialog from '../popups/MapDialog'


interface IPopUpContext {
  openDetails: (book: IBook | null, mode: "edit" | "show" | "add") => void
  closeDetails: () => void
  openCustomerDetails: (book: ICustomer | null, mode: "edit" | "show" | "add") => void
  closeCustomerDetails: () => void

  openRentedBooks: (customer: ICustomer) => void
  closeRentedBooks: () => void
  openRented: () => void
  openMap: () => void
}

const PopUpContext = createContext<IPopUpContext>({
  openDetails: () => {},
  closeDetails: () => {},
  openCustomerDetails: () => {},
  closeCustomerDetails: () => {},
  openRentedBooks: () => {},
  closeRentedBooks: () => {},
  openRented: () => {},
  openMap: () => {}
})

const PopUpProvider = ({children} : {children: ReactNode}) => {

  const [state, setState] = useState({
    detail: false,
    delete: false,
    map: false,
    rentedBooks: false,
    customerDetails: false,
    deleteCustomer: false,
    rent: false
  })

  const [book, setBook] = useState<IBook | null>(null)
  const [mode, setMode] = useState<"edit" | "show" | "add">("show")
  const [customer, setCustomer] = useState<ICustomer | null>(null)
  
  return (
    <PopUpContext.Provider
    value={{
        openDetails: (book, mode) => {setMode(mode); setBook(book); setState((old) => ({...old, detail: true}))},
        openCustomerDetails: (book, mode) => {setMode(mode); setCustomer(book); setState((old) => ({...old, customerDetails: true}))},
        openRentedBooks: (book) => {setCustomer(book); setState((old) => ({...old, rentedBooks: true}))},
        closeDetails: () => {setState((old) => ({...old, detail: false})); setBook(null)},
        closeCustomerDetails: () => {setState((old) => ({...old, customerDetails: false})); setCustomer(null)},
        closeRentedBooks: () => {setState((old) => ({...old, rentedBooks: false})); setCustomer(null)},
        openRented: () => setState((old) => ({...old, rent: true})),
        openMap: () => setState((old) => ({...old, map: true}))
    }}
    >
        {children}
        <DetailDialog mode={mode} book={book} open={state.detail} onClose={() => setState((old) => ({...old, detail: false}))} />
        <CustomerDetailDialog open={state.customerDetails} mode={mode} customer={customer} onClose={() => setState((old) => ({...old, customerDetails: false}))}  />
        <CustomerRentedBooks open={state.rentedBooks}  customer={customer} onClose={() => setState((old) => ({...old, rentedBooks: false}))}  />
        <RentDialog open={state.rent} onClose={() => setState((old) => ({...old, rent: false}))} />
        <MapDialog  open={state.map} onClose={() => setState((old) => ({...old, map: false}))} />
    </PopUpContext.Provider>
  )
}

export default PopUpProvider

export const usePopUps = () => useContext(PopUpContext)