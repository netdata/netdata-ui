import React, { Children, useState, useCallback, useMemo, useEffect } from "react"
import { Tab } from "./tab"

export const useBuildTabs = (children, activeIndex, onChange) => {
  return useMemo(() => {
    const indeces = []
    const nav = []
    let content = null
    let firstActiveIndex = -1
    let activeIsDisabled = false

    Children.forEach(children, (tab, index) => {
      const props = tab?.props || {}
      if (firstActiveIndex < 0 && !props.disabled) firstActiveIndex = index

      const isActive = activeIndex === indeces.length
      const key = `${index}-${props.label}`

      if (tab) {
        nav.push(<Tab key={key} {...props} onChange={onChange} index={index} active={isActive} />)
      }

      if (isActive) {
        activeIsDisabled = !!props.disabled
        content = props.children
      }

      indeces.push(index)
    })

    return [nav, content, firstActiveIndex, activeIsDisabled]
  }, [children, activeIndex, onChange])
}

export const useSetActive = (selected = 0, onChange) => {
  const [activeIndex, setActiveIndex] = useState(onChange ? selected : 0)

  const setActive = useCallback(
    index => {
      if (onChange) {
        onChange(index)
        return
      }

      setActiveIndex(index)
    },
    [onChange]
  )

  useEffect(() => {
    setActiveIndex(selected || 0)
  }, [selected])

  return [activeIndex, setActive]
}
