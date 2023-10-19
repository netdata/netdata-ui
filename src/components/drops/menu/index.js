import React, { forwardRef, Fragment, useCallback, useMemo } from "react"
import Drop from "@/components/drops/drop"
import useClonedChildren from "@/components/drops/mixins/useClonedChildren"
import getAncestors from "@/components/drops/mixins/getAncestors"
import useForwardRef from "@/hooks/useForwardRef"
import useToggle from "@/hooks/useToggle"
import MenuButton from "./menuButton"
import DefaultDropdown from "./dropdown"
import DropdownItem from "./dropdownItem"

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
      dropdownProps,
      itemProps,
      items,
      Item = DropdownItem,
      Footer,
      Dropdown = DefaultDropdown,
      animation,
      dropTitle,
      dropTitlePadding,
      hasSearch = false,
      ...rest
    },
    parentRef
  ) => {
    const [isOpen, toggleIsOpen, , close] = useToggle(initialOpen, { on: onOpen, off: onClose })

    const [ref, setRef] = useForwardRef(parentRef)

    const onItemClick = useCallback(
      nextValue => {
        if (onChange) onChange(nextValue)
        if (closeOnClick) close()
      },
      [onChange]
    )

    const onClickOutside = useCallback(
      event => {
        if (
          ref.current !== event.target &&
          !getAncestors(event.target).some(node => node === ref.current)
        ) {
          close()
        }
      },
      [close]
    )

    const clonedChildren = useClonedChildren(children, setRef, {
      onClick: toggleIsOpen,
      "aria-haspopup": "listbox",
      "aria-expanded": isOpen,
      open: isOpen,
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
        {clonedChildren || (
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
          <Drop
            animation={animation}
            onEsc={close}
            onClickOutside={onClickOutside}
            hideShadow
            target={ref.current}
            {...dropProps}
          >
            <Dropdown
              dropTitle={dropTitle}
              dropTitlePadding={dropTitlePadding}
              value={value}
              onItemClick={onItemClick}
              items={items}
              itemProps={itemProps}
              Item={Item}
              Footer={Footer}
              hasSearch={hasSearch}
              close={close}
              {...dropdownProps}
            />
          </Drop>
        )}
      </Fragment>
    )
  }
)

export default Menu
