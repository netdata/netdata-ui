import React, { FC } from "react"
import { Text } from "src/components/typography"
import { MarginProps, AlignSelfProps } from "src/mixins/types"
import { ToggleContainer, HiddenToggleInput, StyledToggle, StyledLabel, LabelText } from "./styled"

export interface ToggleProps extends MarginProps, AlignSelfProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  labelLeft?: string
  labelRight?: string
  Label?: React.ComponentType<any>
  colored?: boolean
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
}

export const Toggle: FC<ToggleProps> = ({
  checked,
  disabled,
  className,
  labelLeft,
  labelRight,
  Label,
  colored,
  margin,
  alignSelf,
  ...props
}: ToggleProps) => (
  <StyledLabel className={className} margin={margin} alignSelf={alignSelf}>
    {labelLeft && (
      <LabelText as={Label} left>
        {labelLeft}
      </LabelText>
    )}
    <ToggleContainer>
      <HiddenToggleInput disabled={disabled} checked={checked} {...props} />
      <StyledToggle checked={checked} disabled={disabled} colored={colored} role="switch" />
    </ToggleContainer>
    {labelRight && (
      <LabelText as={Label} right>
        {labelRight}
      </LabelText>
    )}
  </StyledLabel>
)

Toggle.defaultProps = {
  colored: false,
  Label: Text,
}
