import React, { useState, useMemo } from "react"
import { createContext } from "use-context-selector"
import useContext from "@/utils/useContextSelector"

const TableContext = createContext([])

export const useTableState = select => useContext(TableContext, s => select(s.state))

export const useTableDispatch = () => useContext(TableContext, s => s.setState)

const initialState = {}

const TableProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state]
  )

  return (
    <TableContext.Provider value={contextValue}>
      {useMemo(() => children, [children])}
    </TableContext.Provider>
  )
}

export default TableProvider
