import React, { forwardRef } from "react"
import { StyledButton } from "./styled"
import { Icon } from "@/components/icon"
import { LoaderIcon } from "@/components/icon/components"
import Flex from "@/components/templates/flex"

export const Button = forwardRef(
  (
    {
      label,
      icon = null,
      flavour,
      isLoading,
      loadingLabel,
      onClick = () => {},
      textTransform = "firstLetter",
      iconColor,
      iconSize,
      iconWidth,
      iconHeight,
      children = label,
      ...rest
    },
    ref
  ) => (
    <StyledButton
      flavour={flavour}
      textTransform={textTransform}
      hasIcon={!!icon || isLoading}
      onClick={isLoading ? undefined : onClick}
      ref={ref}
      iconColor={iconColor}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      {...rest}
    >
      {isLoading && <LoaderIcon className="button-icon" />}
      {icon && !isLoading && (
        <Flex justifyContent="center" alignItems="center" width="auto" height="100%">
          <Icon
            size={iconSize}
            className="button-icon"
            title={icon}
            name={icon}
            width={iconWidth}
            height={iconHeight}
          />
        </Flex>
      )}

      {!!children && <span>{(isLoading && loadingLabel) || children}</span>}
    </StyledButton>
  )
)
