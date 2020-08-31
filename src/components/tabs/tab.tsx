import React, { FC, ReactNode, useCallback } from "react"
import { StyledTab } from "./styled"

type OnChange = (index: number) => void

export interface TabProps {
  className?: string
  children?: ReactNode
  active?: boolean
  disabled?: boolean
}

interface TabWrapperProps extends TabProps {
  label: string | JSX.Element
  onChange?: OnChange
  index?: number
}

export const Tab: FC<TabWrapperProps> = ({ label, index, onChange, ...rest }: TabWrapperProps) => {
  const onClick = useCallback(() => onChange && onChange(index || 0), [index, onChange])

  return (
    <StyledTab onClick={rest.disabled ? undefined : onClick} {...rest}>
      {label}
    </StyledTab>
  )
}
