import React, { useMemo, Fragment, useCallback, forwardRef } from "react"
import Drop from "src/components/drops/drop"
import useClonedChildren from "src/components/drops/mixins/useClonedChildren"
import getAncestors from "src/components/drops/mixins/getAncestors"
import useForwardRef from "src/components/drops/mixins/useForwardRef"
import useToggle from "src/hooks/use-toggle"
import MenuButton from "./menuButton"
import Dropdown from "./dropdown"
import DropdownItem from "./dropdownItem"

const defaultRenderDropdown = props => <Dropdown {...props} />

const defaultRenderItem = props => {
  const key = props.item.value || props.item.label
  return <DropdownItem key={key} {...props} />
}

const Menu = forwardRef(
  (
    {
      value,
      onChange,
      onOpen,
      onClose,
      closeOnClick = true,
      open: initialOpen = false,
      icon = null,
      label,
      caret = true,
      children,
      dropProps,
      items,
      renderItem = defaultRenderItem,
      renderDropdown = defaultRenderDropdown,
      ...rest
    },
    parentRef
  ) => {
    const [isOpen, toggleIsOpen, open, close] = useToggle(initialOpen, { on: onOpen, off: onClose })

    const [ref, setRef] = useForwardRef(parentRef)

    const onItemClick = useCallback(
      nextValue => {
        if (onChange) onChange(nextValue)
        if (closeOnClick) close()
      },
      [onChange]
    )

    const onClickOutside = useCallback(event => {
      if (
        ref.current !== event.target &&
        !getAncestors(event.target).some(node => node === ref.current)
      ) {
        close()
      }
    }, [])

    const clonedChildren = useClonedChildren(children, setRef, {
      onClick: toggleIsOpen,
      "aria-haspopup": "listbox",
      "aria-expanded": open,
      ...rest,
    })

    const menuLabel = useMemo(() => {
      if (label) return label
      if (clonedChildren) return clonedChildren

      const item = items.find(i => i.value === value)
      return item?.label
    }, [label, clonedChildren, items, value])

    return (
      <Fragment>
        {clonedChildren}
        {!clonedChildren && (
          <MenuButton
            ref={setRef}
            icon={icon}
            label={menuLabel}
            caret={caret}
            onClick={toggleIsOpen}
            open={isOpen}
            {...rest}
          />
        )}
        {isOpen && ref.current && (
          <Drop target={ref.current} onEsc={close} onClickOutside={onClickOutside} {...dropProps}>
            {renderDropdown({ value, onItemClick, items, renderItem })}
          </Drop>
        )}
      </Fragment>
    )
  }
)

export default Menu
