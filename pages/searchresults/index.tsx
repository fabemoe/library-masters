import { useRouter } from 'next/router'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Book from '../../components/Book'
import { IBook, useData } from '../../providers/DataProvider'

const index = () => {

    const {books} = useData()
    const {query, asPath} = useRouter()

    const [filteredBooks, setFilteredBooks] = useState<IBook[]>([])

    useEffect(() => {

        console.log(query)
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
    }, [books, query.query, asPath])
    
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
                {!query.query ? "All books" : `Search results for "${query.query}"`}
            </h1>
            <span
            style={{
                color: "#c9c9c9"
            }}
            >
                {filteredBooks.length + " " + (filteredBooks.length > 1 ? "results" : "result")}
            </span>
        </div>

        {/* Container für Bücher */}
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
                    <Book book={book} />
                    ))
                }
        </div>
    </div>
  )
}

export default index