import React, { useContext, createContext, useState, useCallback, useMemo } from "react"

const TableContext = createContext({})

export const useTableContext = () => useContext(TableContext)

const initialState = { hoveredRow: null, hoveredColumn: null }

const TableProvider = ({ onHoverCell, children }) => {
  const [state, setState] = useState(initialState)

  const dispatch = useCallback(values => {
    setState(prev => ({
      ...prev,
      ...values,
    }))
  }, [])

  const onHover = useCallback(
    ({ row, column } = {}) => {
      dispatch({ hoveredRow: row, hoveredColumn: column })
      onHoverCell?.({ row, column })
    },
    [onHoverCell]
  )

  const contextValue = useMemo(() => ({ ...state, dispatch, onHover }), [state, onHover])

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
}

export default TableProvider
