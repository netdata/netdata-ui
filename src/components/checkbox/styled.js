import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getSizeBy } from "@/theme"
import { focusRingOutline } from "@/mixins/focusRing"
import visuallyHidden from "@/mixins/visuallyHidden"

export const HiddenCheckboxInput = styled.input.attrs({
  type: "checkbox",
})`
  ${visuallyHidden}
`

const markSizeOf = props => getSizeBy((props.markSize ?? 2.25) / 2)(props)

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
  ...(props.variant === "filled" && {
    justifyContent: "center",
    flex: false,
    round: 1,
    border: {
      side: "all",
      size: getSizeBy(0.1875)(props),
      color: isFilled(props) ? "buttonNeutralFill" : "controlBorder",
    },
    background: isFilled(props) ? "buttonNeutralFill" : "inputBg",
  }),
  ...props,
}))`
  transition: border-color 140ms ease-out;

  ${({ disabled, interactive }) =>
    !disabled &&
    interactive !== false &&
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

  ${({ variant }) =>
    variant === "filled" &&
    css`
      transition:
        background-color 120ms ease,
        border-color 120ms ease;

      &:after {
        content: "";
        width: ${markSizeOf};
        height: ${props =>
          props["data-state"] === "mixed" ? getSizeBy(0.25)(props) : markSizeOf(props)};
        background-color: ${getColor("buttonNeutralText")};
        ${({ shape }) => shape === "radio" && "border-radius: 50%;"}
        clip-path: ${props =>
          props["data-state"] === "mixed" || props.shape === "radio"
            ? "none"
            : "polygon(14% 44%, 0 59%, 40% 100%, 100% 22%, 86% 8%, 39% 70%)"};
        transform: ${props => (isFilled(props) ? "scale(1)" : "scale(0)")};
        transition: transform 100ms ease;
      }

      ${({ disabled, interactive }) =>
        !disabled &&
        interactive !== false &&
        css`
          &:hover,
          label:hover & {
            border-color: ${getColor("buttonNeutralFill")};
          }
        `}

      ${HiddenCheckboxInput}:focus-visible + & {
        outline-color: ${getColor("segmentedFocus")};
      }
    `}

  ${({ interactive }) =>
    interactive === false &&
    css`
      box-sizing: border-box;
      transition: none;

      &:after {
        transition: none;
      }
    `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:after {
      transition: none;
    }
  }
`
