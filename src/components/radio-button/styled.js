import styled from "styled-components"
import { getColor } from "@/theme/utils"
import margin from "@/mixins/margin"
import alignItems from "@/components/templates/mixins/alignItems"
import alignSelf from "@/mixins/alignSelf"
import { Icon } from "@/components/icon"
import disabled from "./mixins/disabled"

export const Input = styled.input`
  && {
    height: 0;
    width: 0;
    opacity: 0;
    -moz-appearance: none;
    margin: 0;
    border: none;
  }
`

export const Container = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${alignItems}
  ${alignSelf}

  ${margin}
  ${disabled}
`

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex: 0 0 auto;

  height: 16px;
  width: 16px;

  box-sizing: border-box;
  border: 1px solid ${props => getColor(props.borderColor)(props)};
  border-radius: 100%;
  background: ${props => getColor(props.background)(props)};

  ${margin}
`
export const StyledIcon = styled(Icon)`
  fill: ${props => getColor(props.color)(props)};
  height: 8px;
  width: 8px;
`
