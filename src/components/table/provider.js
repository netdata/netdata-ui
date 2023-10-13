import React, { useEffect, useState, useCallback, useMemo } from "react"
import { createContext } from "use-context-selector"
import { debounce } from "throttle-debounce"
import useContext from "@/utils/useContextSelector"

const TableUtilsContext = createContext({})

export const useTableUtilsContext = select => useContext(TableUtilsContext, select)

const utilsInitialState = { hoveredRow: null, hoveredColumn: null }

const TableUtilsProvider = ({ onHoverCell, children }) => {
  const [state, setState] = useState(utilsInitialState)

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

  const onHover = useCallback(values => debounce(10, () => dispatch(values)), [onHoverCell])

  useEffect(() => {
    if (!onHoverCell) return

    onHoverCell({ row: state.hoveredRow + 1, column: state.hoveredColumn })
  }, [state.hoveredRow, state.hoveredColumn, onHoverCell])

  const contextValue = useMemo(() => ({ ...state, dispatch, onHover }), [state, onHover])

  return <TableUtilsContext.Provider value={contextValue}>{children}</TableUtilsContext.Provider>
}

const TableContext = createContext([])

export const useTableState = select => useContext(TableContext, s => select(s.state))

export const useTableDispatch = () => useContext(TableContext, s => s.setState)

const initialState = {}

const TableProvider = ({ children, ...rest }) => {
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
      <TableUtilsProvider {...rest}>{useMemo(() => children, [children])}</TableUtilsProvider>
    </TableContext.Provider>
  )
}

export default TableProvider
