import styled from "styled-components"
import { MDXButton } 

export const MDXButton = ({
  label = "default",
  onClick = () => {},
  icon,
  isLoading,
}: ButtonPropsT) => (
  <>
    <Button
      label={label}
      onClick={onClick}
      unelevated
      icon={isLoading ? <CircularProgress /> : icon}
    />
  </>
)
