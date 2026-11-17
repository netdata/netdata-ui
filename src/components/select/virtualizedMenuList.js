import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react"
import { useVirtualizer } from "@tanstack/react-virtual"
import styled, { css, useTheme } from "styled-components"
import { insetMenuPadding } from "@/components/drops/dropdownStyles"
import Box from "@/components/templates/box"
import { getColor } from "@/theme"
import { mergeRefs } from "@/utils/mergeRefs"
import { virtualRangeWithIndex } from "@/utils/virtualRangeWithIndex"

const POINTING = "data-pointing"
// Short lists mount every row: with hover off the render path, windowing only pays off for long ones.
const WINDOWED_ABOVE = 200
const WINDOW_OVERSCAN = 5

const fullyVisible = (list, index) => {
  const row = list?.querySelector(`[data-index="${index}"]`)
  if (!row) return false
  const outer = list.getBoundingClientRect()
  const inner = row.getBoundingClientRect()
  return inner.top >= outer.top && inner.bottom <= outer.bottom
}

const isGroup = item => !!item.props?.Heading

const withoutScrollRef = option =>
  isValidElement(option) && "innerRef" in option.props
    ? cloneElement(option, { innerRef: undefined })
    : option

// A group is one child of the list, so its options are laid out as rows of their own to be virtualized.
const rowsOf = children =>
  Children.toArray(children).flatMap(item => {
    if (!isGroup(item)) return [{ element: item }]
    const options = Children.toArray(item.props.children)
    return [
      { group: item, heading: true },
      ...options.map((element, index) => ({
        element,
        group: item,
        last: index === options.length - 1,
      })),
    ]
  })

const GroupHeading = ({ group }) => {
  const { Heading, headingProps, label, cx, getStyles, getClassNames, theme, selectProps } =
    group.props

  return (
    <Heading
      cx={cx}
      getStyles={getStyles}
      getClassNames={getClassNames}
      theme={theme}
      selectProps={selectProps}
      {...headingProps}
    >
      {label}
    </Heading>
  )
}

const groupGap = ({ theme }) => `${theme.constants.SIZE_SUB_UNIT * 2}px`

const Row = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  ${({ heading }) =>
    heading &&
    css`
      padding-top: ${groupGap};
    `}
  ${({ last }) =>
    last &&
    css`
      padding-bottom: ${groupGap};
    `}
`

const PinnedSlot = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 0;
`

const PinnedHeading = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: ${getColor("dropdown")};
`

const VirtualizedMenuList = ({ MenuList, children, innerRef, innerProps, ...props }) => {
  const scrollRef = useRef(null)
  const opened = useRef(false)
  const pointing = useRef(false)
  const rows = useMemo(() => rowsOf(children), [children])
  const focused = useMemo(() => rows.findIndex(row => row.element?.props?.isFocused), [rows])
  const estimate = props.selectProps.estimatedOptionHeight ?? 35
  const inset = props.selectProps.insetMenuContent ? insetMenuPadding : 0
  const padding = inset * useTheme().constants.SIZE_SUB_UNIT
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => estimate,
    paddingStart: padding,
    paddingEnd: padding,
    overscan: rows.length > WINDOWED_ABOVE ? WINDOW_OVERSCAN : rows.length,
    rangeExtractor: range => virtualRangeWithIndex(range, focused),
  })

  useEffect(() => {
    const onKey = () => {
      pointing.current = false
      scrollRef.current?.removeAttribute(POINTING)
    }
    document.addEventListener("keydown", onKey, true)
    return () => document.removeEventListener("keydown", onKey, true)
  }, [])

  useLayoutEffect(() => {
    if (focused < 0) return
    if (opened.current && (pointing.current || fullyVisible(scrollRef.current, focused))) return
    const [offset] =
      virtualizer.getOffsetForIndex(focused, opened.current ? "auto" : "center") || []
    if (offset !== undefined) virtualizer.scrollToOffset(offset)
    opened.current = true
  }, [focused, virtualizer])

  const top = virtualizer.getVirtualItemForOffset(virtualizer.scrollOffset ?? 0)
  const topRow = rows[top?.index]
  const pinned = topRow?.group && !topRow.heading ? topRow.group : null

  return (
    <MenuList
      {...props}
      innerRef={mergeRefs(innerRef, scrollRef)}
      innerProps={{
        ...innerProps,
        onMouseMove: event => {
          if (!pointing.current) scrollRef.current?.setAttribute(POINTING, "")
          pointing.current = true
          innerProps?.onMouseMove?.(event)
        },
      }}
    >
      {pinned ? (
        <PinnedSlot>
          <PinnedHeading padding={[0, inset]}>
            <GroupHeading group={pinned} />
          </PinnedHeading>
        </PinnedSlot>
      ) : null}
      <Box padding={[0, inset]}>
        <Box position="relative" height={`${virtualizer.getTotalSize()}px`}>
          {virtualizer.getVirtualItems().map(item => {
            const row = rows[item.index]
            return (
              <Row
                key={item.key}
                heading={row.heading}
                last={row.last}
                ref={virtualizer.measureElement}
                data-index={item.index}
                style={{ transform: `translateY(${item.start}px)` }}
              >
                {row.heading ? <GroupHeading group={row.group} /> : withoutScrollRef(row.element)}
              </Row>
            )
          })}
        </Box>
      </Box>
    </MenuList>
  )
}

export default VirtualizedMenuList
