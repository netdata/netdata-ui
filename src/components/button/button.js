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
      iconColor,
      iconSize,
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
      iconColor={iconColor}
      {...rest}
    >
      {isLoading && <LoaderIcon className="button-icon" />}
      {icon && !isLoading && (
        <Flex justifyContent="center" alignItems="center" width="auto" height="100%">
          <Icon
            size={iconSize}
            className={iconColor ? "button-icon__color" : "button-icon"}
            title={icon}
            name={icon}
          />
        </Flex>
      )}

      {label && <span>{(isLoading && loadingLabel) || label}</span>}
    </StyledButton>
  )
)

Button.defaultProps = {
  onClick: () => {},
  icon: null,
}
