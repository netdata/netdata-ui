import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useTheme } from "styled-components"
import { insetMenuPadding } from "@/components/drops/dropdownStyles"
import Box from "@/components/templates/box"
import { mergeRefs } from "@/utils/mergeRefs"
import { virtualRangeWithIndex } from "@/utils/virtualRangeWithIndex"

const fullyVisible = (list, index) => {
  const row = list?.querySelector(`[data-index="${index}"]`)
  if (!row) return false
  const outer = list.getBoundingClientRect()
  const inner = row.getBoundingClientRect()
  return inner.top >= outer.top && inner.bottom <= outer.bottom
}

const VirtualizedMenuList = ({ MenuList, children, innerRef, innerProps, ...props }) => {
  const scrollRef = useRef(null)
  const opened = useRef(false)
  const pointing = useRef(false)
  const items = Children.toArray(children)
  const focused = items.findIndex(
    item =>
      item.props?.isFocused ||
      (item.props?.Heading &&
        Array.isArray(item.props.children) &&
        item.props.children.some(option => option.props.isFocused))
  )
  const focusedOption = items[focused]?.props?.isFocused
  const estimate = props.selectProps.estimatedOptionHeight ?? 35
  const inset = props.selectProps.insetMenuContent ? insetMenuPadding : 0
  const padding = inset * useTheme().constants.SIZE_SUB_UNIT
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimate,
    paddingStart: padding,
    paddingEnd: padding,
    overscan: 5,
    rangeExtractor: range => virtualRangeWithIndex(range, focused),
  })

  useEffect(() => {
    const onKey = () => {
      pointing.current = false
    }
    document.addEventListener("keydown", onKey, true)
    return () => document.removeEventListener("keydown", onKey, true)
  }, [])

  useLayoutEffect(() => {
    if (!focusedOption) return
    if (opened.current && (pointing.current || fullyVisible(scrollRef.current, focused))) return
    const [offset] =
      virtualizer.getOffsetForIndex(focused, opened.current ? "auto" : "center") || []
    if (offset !== undefined) virtualizer.scrollToOffset(offset)
    opened.current = true
  }, [focused, focusedOption, virtualizer])

  return (
    <MenuList
      {...props}
      innerRef={mergeRefs(innerRef, scrollRef)}
      innerProps={{
        ...innerProps,
        onMouseMove: event => {
          pointing.current = true
          innerProps?.onMouseMove?.(event)
        },
      }}
    >
      <Box padding={[0, inset]}>
        <Box position="relative" height={`${virtualizer.getTotalSize()}px`}>
          {virtualizer.getVirtualItems().map(row => (
            <Box
              key={row.key}
              position="absolute"
              top={0}
              left={0}
              right={0}
              ref={virtualizer.measureElement}
              data-index={row.index}
              style={{ transform: `translateY(${row.start}px)` }}
            >
              {isValidElement(items[row.index]) && "innerRef" in items[row.index].props
                ? cloneElement(items[row.index], { innerRef: undefined })
                : items[row.index]}
            </Box>
          ))}
        </Box>
      </Box>
    </MenuList>
  )
}

export default VirtualizedMenuList
