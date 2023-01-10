import React, { createContext, ReactNode, useContext } from 'react'


interface IDataContext {

}

const DataContext = createContext<IDataContext>({

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

export const useData = () => useContext(DataContext)