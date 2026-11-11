// Proposal-only chip action for table rows and toolbars. Not wired into src/components.
import styled, { css } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import Tooltip from "@/components/drops/tooltip"
import { Icon } from "@/components/icon"
import { focusRing } from "@/mixins/focusRing"
import { getColor, getRgbColor, getSizeBy } from "@/theme"

const chipStylesByTone = {
  neutral: {
    rest: css`
      color: ${getColor("textLite")};
      background-color: transparent;
      border-color: ${getColor("border")};
    `,
    hover: css`
      color: ${getColor("primary")};
      background-color: ${getRgbColor("primary", 0.1)};
      border-color: ${getRgbColor("primary", 0.5)};
    `,
  },
  ai: {
    rest: css`
      color: ${getColor("primaryAI")};
      background-color: ${getRgbColor("primaryAI", 0.08)};
      border-color: ${getRgbColor("primaryAI", 0.35)};
    `,
    hover: css`
      color: ${getColor("primaryAI")};
      background-color: ${getRgbColor("primaryAI", 0.16)};
      border-color: ${getRgbColor("primaryAI", 0.7)};
    `,
  },
  quiet: {
    rest: css`
      color: ${getColor("textLite")};
      background-color: transparent;
      border-color: transparent;
    `,
    hover: css`
      color: ${getColor("primary")};
      background-color: ${getRgbColor("primary", 0.1)};
      border-color: ${getRgbColor("primary", 0.5)};
    `,
  },
}

const chipRadiusByShape = {
  circle: "50%",
  square: getSizeBy(0.75),
}

const chipSizeByDensity = {
  default: getSizeBy(3.5),
  compact: getSizeBy(3),
}

const ChipButton = styled(Box).attrs({ as: "button", type: "button" })`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  margin: 0;
  padding: 0;
  width: ${({ density }) => chipSizeByDensity[density]};
  height: ${({ density }) => chipSizeByDensity[density]};
  border-width: 1px;
  border-style: solid;
  border-radius: ${({ shape }) => chipRadiusByShape[shape]};
  font: inherit;
  cursor: pointer;
  transition:
    color 140ms ease-out,
    background-color 140ms ease-out,
    border-color 140ms ease-out;

  svg {
    fill: currentColor;
  }

  ${({ tone }) => chipStylesByTone[tone].rest}
  ${({ tone, preview }) => preview === "hover" && chipStylesByTone[tone].hover}

  &:hover:not(:disabled) {
    ${({ tone }) => chipStylesByTone[tone].hover}
  }

  ${focusRing}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const ActionChip = ({
  icon,
  label,
  tone = "neutral",
  shape = "circle",
  density = "default",
  preview,
  ref,
  ...rest
}) => (
  <Tooltip content={label} align="bottom">
    <ChipButton
      ref={ref}
      aria-label={label}
      tone={tone}
      shape={shape}
      density={density}
      preview={preview}
      {...rest}
    >
      <Icon name={icon} size="small" />
    </ChipButton>
  </Tooltip>
)

export const ChipCluster = props => (
  <Flex gap={0.5} alignItems="center" flex={false} onClick={e => e.stopPropagation()} {...props} />
)
