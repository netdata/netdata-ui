import React from "react"

const useBoolean = (initialState = false) => {
  const [value, setValue] = React.useState(initialState)

  const on = React.useCallback(() => {
    setValue(true)
  }, [])

  const off = React.useCallback(() => {
    setValue(false)
  }, [])

  const toggle = React.useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, { on, off, toggle }]
}

export default useBoolean
