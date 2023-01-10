import React, { createContext, ReactNode } from 'react'

const DataContext = createContext({

})

const DataProvider = ({children} : {children: ReactNode}) => {
  return (
    <DataContext.Provider
    value={{

    }}
    >
        {children}
    </DataContext.Provider>
  )
}

export default DataProvider