import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Book from '../../components/Book'
import { IBook, useData } from '../../providers/DataProvider'

const index = () => {

    const {books} = useData()
    const {query} = useRouter()

    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])

    useEffect(() => {

        const sortFunc = (a: IBook, b: IBook) => {
            if ( a.title < b.title ){
                return -1;
              }
              if ( a.title > b.title ){
                return 1;
              }
              return 0;
        }
        
        if (query.query) {
            setFilteredBooks(books.filter((book) => {
                return book.title.toLowerCase().match((query.query as string ?? "").toLowerCase())?.length as number > 0
            }).sort(sortFunc))
        } else {
            //@ts-ignore
            setFilteredBooks(books.sort(sortFunc))
        }
    }, [books, query])
    
  return (
    <div
    className='centered column'
    style={{
        gap: "20px"
    }}
    >
        {
            filteredBooks.map((book) => (
                <Book book={book} />
            ))
        }
    </div>
  )
}

export default index