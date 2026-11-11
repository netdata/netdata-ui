// Proposal-only "more actions" trigger: the topbar Add new chip stack, reused as a row overflow.
import styled from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import Menu from "@/components/drops/menu"
import { Icon } from "@/components/icon"
import { TextSmall } from "@/components/typography"
import { focusRingOutline } from "@/mixins/focusRing"
import { getColor, getRgbColor, getSizeBy } from "@/theme"

const fanEasing = "200ms cubic-bezier(0.2, 0.8, 0.2, 1)"

const Trigger = styled(Box).attrs({ as: "button", type: "button" })`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  height: ${getSizeBy(3.5)};
  margin: 0;
  padding: 0 ${getSizeBy(1)} 0 ${getSizeBy(0.5)};
  border: 1px solid ${getColor("border")};
  border-radius: ${getSizeBy(1.75)};
  background-color: transparent;
  color: ${getColor("textLite")};
  font: inherit;
  cursor: pointer;
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out,
    color 140ms ease-out;

  &:hover,
  &[aria-expanded="true"] {
    color: ${getColor("primary")};
    background-color: ${getRgbColor("primary", 0.1)};
    border-color: ${getRgbColor("primary", 0.5)};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    color: ${getColor("primary")};
    ${focusRingOutline}
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const fanSpread = 4
const fanTilt = 6

const StackChip = styled(Flex).attrs({ alignItems: "center", justifyContent: "center" })`
  box-sizing: border-box;
  width: ${getSizeBy(2.5)};
  height: ${getSizeBy(2.5)};
  border-radius: ${getSizeBy(1.25)};
  border: 1px solid ${getRgbColor("primary", 0.55)};
  background-color: ${getColor("mainBackground")};
  color: ${getColor("textLite")};
  transition:
    transform ${fanEasing},
    color 140ms ease-out;

  & + & {
    margin-left: -${getSizeBy(0.5)};
  }

  svg {
    fill: currentColor;
  }

  ${Trigger}:hover &,
  ${Trigger}:focus-visible &,
  ${Trigger}[aria-expanded="true"] & {
    color: ${getColor("primary")};
    transform: ${({ index, count }) =>
      `translateX(${index * fanSpread}px) rotate(${(index - (count - 1) / 2) * fanTilt}deg)`};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${Trigger}:hover &,
    ${Trigger}:focus-visible &,
    ${Trigger}[aria-expanded="true"] & {
      transform: none;
    }
  }
`

const maxStackedChips = 3

const FanTrigger = ({ actions, ref, ...rest }) => {
  const stacked = actions.slice(0, maxStackedChips)

  return (
    <Trigger ref={ref} aria-label={`${actions.length} more actions`} {...rest}>
      <Flex alignItems="center">
        {stacked.map(({ id, icon }, index) => (
          <StackChip key={id} index={index} count={stacked.length}>
            <Icon name={icon} width="10px" height="10px" />
          </StackChip>
        ))}
      </Flex>
      <TextSmall color="currentColor" strong>
        +{actions.length}
      </TextSmall>
    </Trigger>
  )
}

export const OverflowActions = ({ actions }) => (
  <Menu
    items={actions.map(({ id, icon, label, onClick, disabled }) => ({
      value: id,
      label,
      icon: <Icon name={icon} size="small" />,
      onClick,
      disabled,
    }))}
    dropProps={{ align: { top: "bottom", right: "right" } }}
  >
    <FanTrigger actions={actions} />
  </Menu>
)
