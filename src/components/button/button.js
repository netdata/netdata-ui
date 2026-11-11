import { StyledButton } from "./styled"
import { Icon } from "@/components/icon"
import { LoaderIcon } from "@/components/icon/components"
import Flex from "@/components/templates/flex"

export const Button = ({
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
  iconRotate = 0,
  children = label,
  wrapChildren = true,
  ref,
  ...rest
}) => {
  const labelContent =
    !!children &&
    (wrapChildren ? (
      <span>{(isLoading && loadingLabel) || children}</span>
    ) : (
      (isLoading && loadingLabel) || children
    ))
  const iconContent = isLoading ? (
    <LoaderIcon className="button-icon" />
  ) : icon ? (
    <Flex justifyContent="center" alignItems="center" width="auto" height="100%">
      <Icon
        size={iconSize}
        className="button-icon"
        title={icon}
        name={icon}
        width={iconWidth}
        height={iconHeight}
        rotate={iconRotate}
      />
    </Flex>
  ) : null
  const bareText =
    !iconContent && (typeof labelContent === "string" || typeof labelContent === "number")

  return (
    <StyledButton
      flavour={flavour}
      textTransform={textTransform}
      hasIcon={!!icon || isLoading}
      hasLabel={!!children}
      data-unwrapped-children={wrapChildren ? undefined : ""}
      onClick={isLoading ? undefined : onClick}
      ref={ref}
      iconColor={iconColor}
      iconWidth={iconWidth}
      iconHeight={iconHeight}
      {...rest}
    >
      {bareText ? (
        labelContent
      ) : (
        <>
          {iconContent}
          {labelContent}
        </>
      )}
    </StyledButton>
  )
}
