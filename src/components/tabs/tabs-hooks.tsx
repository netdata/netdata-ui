import React, { ReactNode, Children, useState, useCallback, useMemo, useEffect } from "react"
import { Tab } from "./tab"

export type OnChange = (index: number) => void

export const useBuildTabs = (
  children,
  activeIndex,
  onChange
): [ReactNode[], ReactNode, number, boolean] => {
  return useMemo(() => {
    const indeces: number[] = []
    const nav: ReactNode[] = []
    let content: ReactNode = null
    let firstActiveIndex: number = -1
    let activeIsDisabled: boolean = false

    Children.forEach(children, ({ props }, index) => {
      if (firstActiveIndex < 0 && !props.disabled) firstActiveIndex = index

      const isActive = activeIndex === indeces.length
      const key = `${index}-${props.label}`

      nav.push(<Tab key={key} {...props} onChange={onChange} index={index} active={isActive} />)

      if (isActive) {
        activeIsDisabled = !!props.disabled
        content = props.children
      }

      indeces.push(index)
    })

    return [nav, content, firstActiveIndex, activeIsDisabled]
  }, [children, activeIndex, onChange])
}

export const useSetActive = (selected: number = 0, onChange?: OnChange): [number, OnChange] => {
  const [activeIndex, setActiveIndex] = useState(onChange ? selected : 0)

  const setActive = useCallback(
    (index: number) => {
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
