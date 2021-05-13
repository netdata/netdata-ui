import styled from "styled-components"
import { FixedSizeList, VariableSizeList } from "react-window"
import { webkitVisibleScrollbar } from "src/mixins"

export const StyledFixedList = styled(FixedSizeList)`
  ${webkitVisibleScrollbar}
`

export const StyledVariableList = styled(VariableSizeList)`
  ${webkitVisibleScrollbar}
`
