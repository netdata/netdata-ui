import React, { useEffect, useState, useCallback, useMemo } from "react"
import { createContext } from "use-context-selector"
import useContext from "src/utils/useContextSelector"

const TableContext = createContext({})

export const useTableContext = select => useContext(TableContext, select)

const initialState = { hoveredRow: null, hoveredColumn: null, rowsHeight: {} }

const TableProvider = ({ onHoverCell, children }) => {
  const [state, setState] = useState(initialState)

  const dispatch = useCallback((values, cb) => {
    if (typeof values === "function") {
      setState(
        prev => ({
          ...prev,
          ...values(prev),
        }),
        cb
      )
    } else {
      setState(
        prev => ({
          ...prev,
          ...values,
        }),
        cb
      )
    }
  }, [])

  const onHover = useCallback(values => dispatch(values), [onHoverCell])

  useEffect(() => {
    if (!onHoverCell) return

    onHoverCell({ row: state.hoveredRow + 1, column: state.hoveredColumn })
  }, [state.hoveredRow, state.hoveredColumn])

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
