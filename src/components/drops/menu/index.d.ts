import { FC, ReactNode } from "react"
import { DropProps } from "../drop"

export interface Item {
  value?: string | number
  label?: ReactNode
  reverse?: boolean
  onClick?: Function
  [key: string]: any
}

export type RenderItemType = (props: {
  item: Item
  value: string | number
  onItemClick: Function
}) => JSX.Element

export interface MenuProps {
  value?: string | number
  onChange?: (value: string | number) => void
  onOpen?: () => void
  onClose?: () => void
  closeOnClick?: boolean
  open?: boolean
  icon?: JSX.Element
  label?: ReactNode
  caret?: boolean | JSX.Element
  children?: ReactNode
  dropProps?: DropProps
  dropdownProps?: {
    [key: string]: any
  }
  items?: Item[]
  renderItem?: RenderItemType
  renderDropdown?: (props: {
    items: Item[]
    value: string | number
    onItemClick: Function
    renderItem: RenderItemType
  }) => JSX.Element

  [key: string]: any
}

declare const Menu: FC<MenuProps & JSX.IntrinsicElements["div"]>

export { Menu }

export default Menu
