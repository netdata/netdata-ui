import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor } from "@/theme"
import { focusRingOutline } from "@/mixins/focusRing"
import visuallyHidden from "@/mixins/visuallyHidden"

export const HiddenCheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  ${visuallyHidden}
`

const isFilled = props => props["data-state"] === "checked" || props["data-state"] === "mixed"

const getRestBorder = props => {
  if (props.error) return "error"
  return isFilled(props) ? "primary" : "textLite"
}

export const Checkbox = styled(Flex).attrs(props => ({
  width: "16px",
  height: "16px",
  round: 0.5,
  background: ["transparent", "full"],
  alignItems: "center",
  border: getRestBorder(props),
  ...props,
}))`
  transition: border-color 140ms ease-out;

  ${({ disabled }) =>
    !disabled &&
    css`
      label:hover & {
        ${props =>
          isFilled(props)
            ? `border-color: ${getColor("primaryHover")(props)};`
            : `border-color: ${getColor(props.error ? "errorText" : "text")(props)};`}
      }
    `}

  ${HiddenCheckboxInput}:focus-visible + & {
    ${focusRingOutline}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
