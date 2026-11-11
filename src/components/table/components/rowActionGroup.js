import { useLayoutEffect, useRef, useState } from "react"
import styled, { useTheme } from "styled-components"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Drop from "@/components/drops/drop"
import { Icon } from "@/components/icon"
import { controlHeight } from "@/mixins/controlSize"
import { dropdownBorder, dropdownRound, floatingShadow } from "@/components/drops/dropdownStyles"
import Action from "./action"

const Panel = styled(Flex)`
  ${floatingShadow}
`

const Stack = styled(Flex)`
  > * + * {
    margin-inline-start: -${({ theme }) => theme.constants.SIZE_SUB_UNIT}px;
  }
`

const StackIcon = ({ icon }) => (
  <Flex
    width={4}
    height={4}
    alignItems="center"
    justifyContent="center"
    round="50%"
    border={{ side: "all", color: "border" }}
    background="mainBackground"
  >
    <Icon name={icon} color="textLite" width="10px" height="10px" />
  </Flex>
)

const resolve = (value, row) => (typeof value === "function" ? value(row) : value)

const useAvailableWidth = () => {
  const ref = useRef(null)
  const [width, setWidth] = useState(null)
  useLayoutEffect(() => {
    const element = ref.current
    const update = () => {
      const available = element.clientWidth
      if (available) setWidth(available)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return [ref, width]
}

const RowActionGroup = ({ actions, row, table, testPrefix, inline }) => {
  const theme = useTheme()
  const size = Number.parseFloat(controlHeight("default")({ theme }))
  const gap = theme.constants.SIZE_SUB_UNIT * 2
  const [groupRef, width] = useAvailableWidth()
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const activate = useRef(new Map())
  const [open, setOpen] = useState(false)

  const visible = actions.flatMap(({ isVisible, ...action }) =>
    resolve(isVisible, row.original) === false ? [] : [action]
  )
  const customCount = visible.filter(action => action.CustomComponent || action.label).length
  const naturalWidth = visible.length * size + Math.max(0, visible.length - 1) * gap
  const fits = width === null || naturalWidth <= width
  const withStack = width >= size * 2 + gap
  const triggerWidth = withStack ? size * 2 : size
  let remaining = Math.max(0, Math.floor((width - triggerWidth) / (size + gap)) - customCount)
  const overflow = fits
    ? []
    : visible.filter(action => {
        if (action.CustomComponent || action.label) return false
        if (remaining === 0) return true
        remaining -= 1
        return false
      })
  const showPanel = open && overflow.length > 0
  const close = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  useLayoutEffect(() => {
    if (showPanel) panelRef.current?.querySelector("button:not(:disabled)")?.focus()
    if (!showPanel && open) setOpen(false)
  }, [showPanel, open])

  return (
    <Flex
      ref={groupRef}
      data-testid="action-cell"
      data-table-inline-actions={inline ? "" : undefined}
      flex={false}
      alignItems="center"
      justifyContent="end"
      gap={2}
      width={inline ? { base: `${naturalWidth}px`, max: `max(50%, ${size}px)` } : "100%"}
      onClick={event => event.stopPropagation()}
    >
      {visible.map(
        ({ id, handleAction, isDisabled, dataGa, disabledTooltipText, tooltipText, ...rest }) => {
          const inOverflow = overflow.some(action => action.id === id)
          return (
            <Action
              rowChip
              {...rest}
              disabled={resolve(isDisabled, row.original)}
              dataGa={resolve(dataGa, row.original)}
              disabledTooltipText={resolve(disabledTooltipText, row.original)}
              tooltipText={resolve(tooltipText, row.original)}
              key={id}
              id={id}
              handleAction={() => handleAction(row.original, table)}
              testPrefix={testPrefix}
              currentRow={row}
              hiddenControl={inOverflow}
              activationRef={activation => {
                if (activation) activate.current.set(id, activation)
                else activate.current.delete(id)
              }}
            />
          )
        }
      )}
      {overflow.length > 0 && (
        <Button
          ref={triggerRef}
          type="button"
          flavour="hollow"
          neutral
          round={withStack ? "999px" : "50%"}
          width={`${triggerWidth}px`}
          padding={[0]}
          aria-label={`${overflow.length} more row actions`}
          aria-expanded={showPanel}
          onClick={() => setOpen(value => !value)}
          {...(!withStack ? { icon: "more" } : {})}
        >
          {withStack && (
            <Stack aria-hidden="true" alignItems="center">
              {overflow.slice(0, 2).map(action => (
                <StackIcon key={action.id} icon={resolve(action.icon, row.original)} />
              ))}
            </Stack>
          )}
        </Button>
      )}
      {showPanel && (
        <Drop
          align={{ top: "bottom", right: "right" }}
          onEsc={close}
          stretch={false}
          onClickOutside={event => {
            if (!triggerRef.current?.contains(event.target)) setOpen(false)
          }}
          target={triggerRef.current}
        >
          <Panel
            ref={panelRef}
            column
            alignItems="stretch"
            role="group"
            aria-label="More row actions"
            background="dropdown"
            border={dropdownBorder}
            round={dropdownRound}
            padding={[1]}
          >
            {overflow.map(action => (
              <Button
                key={action.id}
                type="button"
                flavour="borderless"
                neutral
                icon={resolve(action.icon, row.original)}
                label={resolve(action.tooltipText, row.original) || action.id}
                justifyContent="start"
                disabled={resolve(action.isDisabled, row.original)}
                onClick={event => {
                  close()
                  activate.current.get(action.id)?.(event)
                }}
              />
            ))}
          </Panel>
        </Drop>
      )}
    </Flex>
  )
}

export default RowActionGroup
