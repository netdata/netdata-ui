// Simulations: styled wrappers that override the real Button, IconButton, SearchInput and Select
// metrics, so the proposed ladder can be judged before any component changes.
import styled, { css } from "styled-components"
import Box from "@/components/templates/box"
import { Button, IconButton } from "@/components/button"
import Search from "@/components/search"
import Select from "@/components/select"
import { getSizeBy } from "@/theme"

// Sizes in 8px units; text in px because the typography scale has no 13px step.
export const ladder = {
  compact: { height: 3, text: 12, buttonPad: 1.5, fieldInset: 1, icon: 1.75 },
  default: { height: 3.5, text: 13, buttonPad: 1.5, fieldInset: 1.25, icon: 2 },
  large: { height: 4, text: 14, buttonPad: 2, fieldInset: 1.5, icon: 2 },
}

const metrics = ({ density = "default" }) => ladder[density] || ladder.default

const buttonMetrics = css`
  &&& {
    min-height: ${props => getSizeBy(metrics(props).height)};
    height: ${props => getSizeBy(metrics(props).height)};
    font-size: ${props => metrics(props).text}px;
    line-height: ${getSizeBy(2)};
    padding: 0 ${props => getSizeBy(metrics(props).buttonPad)};
  }
`

export const DensityButton = styled(Button)`
  ${buttonMetrics}
`

export const DensityIconButton = styled(IconButton)`
  &&& {
    width: ${props => getSizeBy(metrics(props).height)};
    min-width: ${props => getSizeBy(metrics(props).height)};
    height: ${props => getSizeBy(metrics(props).height)};
    min-height: ${props => getSizeBy(metrics(props).height)};
    padding: 0;
  }

  &&& .button-icon {
    width: ${props => getSizeBy(metrics(props).icon)};
    height: ${props => getSizeBy(metrics(props).icon)};
  }
`

// The search icon sits in the inset; text starts after icon + 6px gap, as today.
const SearchFrame = styled(Box)`
  && input {
    height: ${props => getSizeBy(metrics(props).height)};
    font-size: ${props => metrics(props).text}px;
    padding-left: ${props => getSizeBy(metrics(props).fieldInset + 1.75 + 0.75)};
    padding-right: ${props => getSizeBy(metrics(props).fieldInset + 1.75)};
  }

  && input::placeholder {
    font-size: ${props => metrics(props).text}px;
  }

  && label > div > div:first-child {
    left: ${props => getSizeBy(metrics(props).fieldInset)};
  }
`

export const DensitySearch = ({ density, width = 48, ...props }) => (
  <SearchFrame density={density} width={width}>
    <Search {...props} />
  </SearchFrame>
)

const prefix = "refresh-select"

const SelectFrame = styled(Box)`
  && .${prefix}__control {
    min-height: ${props => getSizeBy(metrics(props).height)};
    height: ${props => getSizeBy(metrics(props).height)};
  }

  && .${prefix}__value-container {
    min-height: 0;
    height: 100%;
    padding: 0 ${props => getSizeBy(metrics(props).fieldInset)};
  }

  && .${prefix}__indicators-container {
    min-height: 0;
    height: 100%;
  }

  && .${prefix}__single-value, && .${prefix}__placeholder, && .${prefix}__input-container {
    font-size: ${props => metrics(props).text}px;
  }
`

export const DensitySelect = ({ density, width = 40, ...props }) => (
  <SelectFrame density={density} width={width}>
    <Select classNamePrefix={prefix} {...props} />
  </SelectFrame>
)
