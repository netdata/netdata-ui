import React, { createContext, useReducer, useCallback, useMemo } from "react"

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATE":
      return {
        ...state,
        ...action.payload,
      }
    default:
      throw new Error()
  }
}

export const SharedTableContext = createContext({
  state: {},
  udateState: state => null,
})

export const SharedTableProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})

  const updateState = useCallback(state => {
    dispatch({
      type: "UPDATE_STATE",
      payload: { ...state },
    })
  }, [])

  const contextValue = useMemo(() => ({ state, updateState }), [state, updateState])

  return <SharedTableContext.Provider value={contextValue}>{children}</SharedTableContext.Provider>
}
