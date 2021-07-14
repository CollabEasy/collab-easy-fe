import React, { useContext } from 'react'

const RoutesContext = React.createContext({})

export const useRoutesContext = () => useContext(RoutesContext)

export const RoutesProvider = RoutesContext.Provider

export default RoutesContext
