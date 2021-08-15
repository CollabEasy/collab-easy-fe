import React, { useContext } from 'react'
import { AppRouteCreators } from 'types/core'

const RoutesContext = React.createContext({} as AppRouteCreators)

export const useRoutesContext = () => useContext(RoutesContext)

export const RoutesProvider = RoutesContext.Provider

export default RoutesContext
