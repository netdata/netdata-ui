import React, { useContext, createContext, useState, useCallback, useMemo } from "react"

const TableContext = createContext({})

export const useTableContext = () => useContext(TableContext)

const TableProvider = ({ onHoverRow, children }) => {
  const [state, setState] = useState({ hoveredRow: null })

  const dispatch = useCallback(values => {
    setState(prev => ({
      ...prev,
      ...values,
    }))
  }, [])

  const onHover = useCallback(
    id => {
      dispatch({ hoveredRow: id })
      onHoverRow?.(id)
    },
    [onHoverRow]
  )

  const contextValue = useMemo(() => ({ ...state, dispatch, onHover }), [state, onHover])

  return <TableContext.Provider value={contextValue}>{children}</TableContext.Provider>
}

export default TableProvider
