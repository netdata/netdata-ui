import styled from "styled-components"
import { getColor, getSizeUnit } from "../../theme/utils"

export const CheckboxContainer = styled.div`
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
`
// Could be changed to our standard icon
export const Icon = styled.svg`
  fill: none;
  stroke: ${getColor(["green", "greenHaze"])};
  stroke-width: 2px;
`

export const HiddenCheckboxInput = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  box-sizing: border-box;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: ${getColor(["white", "pure"])};
  border: 1px solid ${getColor(["gray", "limedSpruce"])};
  transition: all 150ms;

  ${HiddenCheckboxInput}:focus + & {
    box-shadow: 0 0 0 3px ${getColor(["gray", "gallery"])};
  }

  ${Icon} {
    visibility: ${props => (props.checked ? "visible" : "hidden")};
  }
`

export const StyledLabel = styled.label`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
`

export const LabelText = styled.span<{ left?: boolean; right?: boolean }>`
  ${({ right, ...props }) =>
    right ? `margin-left: ${getSizeUnit(props)}px;` : `margin-right: ${getSizeUnit(props)}px;`}
`

export const AccessibleArea = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  height: 30px;
  width: calc(100% + 10px);
`
