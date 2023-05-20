import React, { useContext, createContext, useState, useCallback, useMemo } from "react"

const TableContext = createContext({})

export const useTableContext = () => useContext(TableContext)

const initialState = { hoveredRow: null, hoveredColumn: null, rowsHeight: {} }

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

  const setRowHeight = useCallback(({ index, height }) => {
    setState(prev => ({
      ...prev,
      rowsHeight: { ...prev.rowsHeight, [index]: Math.max(prev.rowsHeight[index] || 0, height) },
    }))
  }, [])

  const contextValue = useMemo(
    () => ({ ...state, dispatch, onHover, setRowHeight }),
    [state, onHover]
  )

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
}

export default TableProvider
