import React, { useEffect, useState } from 'react'
import { ICustomer, useData } from '../../providers/DataProvider'
import Customer from '../../components/Customer'
import { useRouter } from 'next/router'

const index = () => {

    const {customers} = useData()
    const {query, asPath} = useRouter()

    const [filteredBooks, setFilteredBooks] = useState<ICustomer[]>([])

    useEffect(() => {

        console.log(query)
        const sortFunc = (a: ICustomer, b: ICustomer) => {
            if ( a.name < b.name ){
                return -1;
              }
              if ( a.name > b.name ){
                return 1;
              }
              return 0;
        }
        
        if (query.query) {
            setFilteredBooks(customers.filter((book) => {
                return book.name.toLowerCase().match((query.query as string ?? "").toLowerCase())?.length as number > 0
            }).sort(sortFunc))
        } else {
            //@ts-ignore
            setFilteredBooks(customers.sort(sortFunc))
        }
    }, [customers, query.query, asPath])
    
  return (
    <div
    style={{
        marginTop: "20px",
    }}
    className='flex column'
    >
        <div
        className='flex column'
        style={{
            marginInline: "10%",
            gap: "2px",
            marginBottom: "20px"
        }}
        >
            <h1
            >
                Customers
            </h1>
        </div>

        {/* Container für Customer*/}
        <div
        className='centered column'
        style={{
            gap: "20px",
            width: "80%",
            alignSelf: "center"
        }}
        >
            {
                filteredBooks.map((book) => (
                    <Customer customer={book} />
                    ))
                }
        </div>
        </div>
  )
}

export default index