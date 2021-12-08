import React, { forwardRef } from "react"
import { StyledButton } from "./styled"
import { Icon } from "src/components/icon"
import { LoaderIcon } from "src/components/icon/components"
import Flex from "src/components/templates/flex"

export const Button = forwardRef(
  (
    {
      label,
      icon,
      flavour,
      isLoading,
      loadingLabel,
      onClick,
      textTransform = "firstLetter",
      ...rest
    },
    ref
  ) => (
    <StyledButton
      flavour={flavour}
      textTransform={textTransform}
      hasLabel={!!label}
      hasIcon={!!icon || isLoading}
      onClick={isLoading ? undefined : onClick}
      ref={ref}
      {...rest}
    >
      {isLoading && <LoaderIcon className="button-icon" />}
      {icon && !isLoading && (
        <Flex justifyContent="center" alignItems="center" width="auto" height="100%">
          <Icon className="button-icon" title={icon} name={icon} />
        </Flex>
      )}
      {label && <span>{(isLoading && loadingLabel) || label}</span>}
    </StyledButton>
  )
)

Button.defaultProps = {
  onClick: () => {},
  icon: null
}
