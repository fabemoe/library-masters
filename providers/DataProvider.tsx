import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

interface ICustomerDTO {
    name: string
    street: string
    houseNumber: string
    town: string
    zip: string
    email: string
   
}

export interface ICustomer extends ICustomerDTO {
    id: string
    rented: {
        book: IBook,
        from: string,
        to: string
    }[]
}

interface IBookDTO {
    title: string
    author: string
    description: string
    publish_date: string
    page_count: number
    category: string
    isbn: string
}

export interface IBookCopy {
    id: string
    location: number
    availability: 1 | 0
}

export interface IBook extends IBookDTO {
    copies:  IBookCopy[]
    imageURL: string
}

interface IDataContext {
    books: IBook[]
    customers: ICustomer[]
}

const DataContext = createContext<IDataContext>({
    books: [],
    customers: []
})

const DataProvider = ({children} : {children: ReactNode}) => {

    useEffect(() => {
        //@ts-ignore
        const modifiedBooks: IBook[] = bookData.map((book: IBookDTO) => {
            
            let copies = []
            for(let i = 0; i < Math.ceil(Math.random()*20); i++) {
                copies.push(
                    {
                        id: Math.ceil(Math.random()*1000),
                        location: book.category.charCodeAt(0),
                        availability: Math.random() > 0.5 ? 1 : 0
                    }
                )
            }
            
            return (
                {
                    ...book,
                    //TODO Delete!
                    imageURL: "/Bild.png",
                    copies
                }
            )
        })
        
        //@ts-ignore
        const modifiedCustomers: ICustomer[] = customerData.map((customer: ICustomerDTO) => {

            
            return ({
                ...customer,
                id: Math.ceil(Math.random()*10000).toString(),
                rented: [
                    ...modifiedBooks.map((book) => {
                        return {
                            book,
                            from: new Date().toLocaleDateString(),
                            to: new Date().toLocaleDateString()
                        }
                    })
                ]
            })
        })

        console.log(modifiedCustomers)
        setCustomers(modifiedCustomers)
        setBooks(modifiedBooks)
    }, [])

    const [books, setBooks] = useState<IBook[]>([])
    const [customers, setCustomers] = useState<ICustomer[]>([])
    
  return (
    <DataContext.Provider
    value={{
        books,
        customers
    }}
    >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider

export const useData = () => useContext(DataContext)

const bookData: IBookDTO[] = [
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "description": "The Great Gatsby is a novel by F. Scott Fitzgerald, published in 1925. The story takes place in the summer of 1922 and follows the life of Jay Gatsby, a mysterious and wealthy man who throws extravagant parties in hopes of winning back his lost love, Daisy Buchanan.",
        "publish_date": "1925",
        page_count: 321,
        "category": "Fiction",
        "isbn": "978-0743273567"
    },
    {
        "title": "1984,5",
        "author": "George Orwell",
        "publish_date": "June 8, 1949",
        "isbn": "978-0451524935",
        "page_count": 328,
        "category": "Fiction",
        "description": "1984 is a novel by George Orwell published in 1949. The novel is set in Airstrip One, a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation."
    },
    {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "description": "The Catcher in the Rye is a novel by J.D. Salinger, published in 1951. The story is narrated by Holden Caulfield, a teenage boy who has been expelled from his prep school. The novel deals with themes of alienation and loss of innocence.",
        "publish_date": "1951",
        "category": "Fiction",
        "isbn": "031676948",
        page_count: 12
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        description: "To Kill a Mockingbird is a novel by Harper Lee, published in 1960. The story is set in the 1930s in the fictional town of Maycomb, Alabama, and deals with themes of racial injustice and the loss of innocence.",
        publish_date: "1960",
        category: "Fiction",
        isbn: "0446310786",
        page_count: 743
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        description: "The Lord of the Rings is an epic fantasy novel by J.R.R. Tolkien, published in three volumes between 1954 and 1955. The story follows hobbit Frodo Baggins as he embarks on a quest to destroy the One Ring and defeat the Dark Lord Sauron.",
        publish_date: "1954-1955",
        category: "Fantasy",
        isbn: "9780544003415",
        page_count: 65
    },
    {
        title: "1984",
        author: "George Orwell",
        description: "1984 is a dystopian novel by George Orwell, published in 1949. The story takes place in a totalitarian society where the government exercises total control over every aspect of people's lives.",
        publish_date: "1949",
        category: "Science fiction",
        isbn: "9780547249643",
        page_count:130
    },
    {
        title: "The Da Vinci Code",
        author: "Dan Brown",
        description: "The Da Vinci Code is a mystery-detective novel by Dan Brown, published in 2003. The story follows symbologist Robert Langdon as he investigates a murder at the Louvre Museum in Paris and discovers a conspiracy involving the Holy Grail and the Priory of Sion.",
        publish_date: "2003",
        category: "Mystery",
        isbn: "9780385504201",
        page_count:200
    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        description: "The Hitchhiker's Guide to the Galaxy is a comedic science fiction series by Douglas Adams, first published in 1979. The story follows an unwitting human and his alien friend as they travel through space and encounter a variety of strange and amusing situations.",
        publish_date: "1979",
        category: "Science fiction, comedy",
        isbn: "0345391802",
        page_count:300
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        description: "The Alchemist is a novel by Paulo Coelho, published in 1988. The story follows a young shepherd named Santiago as he embarks on a journey to fulfill his personal legend",
        publish_date:"1988",
        category: "Fiction",
        isbn: "0345391762",
        page_count:540
    }

]

const customerData: ICustomerDTO[] = [
    {
        name: "Max Musterman",
        street: "Universitätsstraße",
        houseNumber: "67",
        town: "Klagenfurt",
        email: "asidnfhj@edu.aau.at",
        zip: "9020",
    },
    {
        name: "Max Muster",
        street: "Universitätsstraße",
        houseNumber: "67",
        town: "Klagenfurt",
        email: "asidnfhj@edu.aau.at",
        zip: "9020",
    },
    {
        name: "Max Mann",
        street: "Universitätsstraße",
        houseNumber: "67",
        town: "Klagenfurt",
        email: "asidnfhj@edu.aau.at",
        zip: "9020",
    },
    {
        name: "Max Max",
        street: "Universitätsstraße",
        houseNumber: "67",
        town: "Klagenfurt",
        email: "asidnfhj@edu.aau.at",
        zip: "9020",
    },
    {
        name: "Max Mustermax",
        street: "Universitätsstraße",
        houseNumber: "67",
        town: "Klagenfurt",
        email: "asidnfhj@edu.aau.at",
        zip: "9020",
    },
]