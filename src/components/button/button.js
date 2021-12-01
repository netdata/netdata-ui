import React, { forwardRef } from "react"
import { StyledButton } from "./styled"
import { Icon } from "src/components/icon"
import { LoaderIcon } from "src/components/icon/components"

export const Button = forwardRef(
  (
    {
      label,
      icon,
      flavour,
      isLoading,
      loadingLabel,
      loadingIcon,
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
      onClick={isLoading ? undefined : onClick}
      ref={ref}
      {...rest}
    >
      {isLoading && !loadingIcon && !loadingIcon && <LoaderIcon className="button-icon" />}
      {icon && !isLoading && !loadingIcon && (
        <Icon className="button-icon" title={isLoading ? loadingIcon : icon} name={icon} />
      )}
      {label && <span>{(isLoading && loadingLabel) || label}</span>}
    </StyledButton>
  )
)

Button.defaultProps = {
  onClick: () => {},
  icon: null,
  loadingIcon: null,
}
