import styled, { css } from "styled-components"
import alignSelf from "src/mixins/alignSelf"
import margin from "src/mixins/margin"
import padding from "src/mixins/padding"

const list = css`
  ${alignSelf}
  ${margin}
  ${padding}
`

export const List = styled.ul`
  list-style-type: disc;
  list-style-position: outside;
  padding-left: 28px;
  ${list}
`

export const ListItem = styled.li`
  line-height: 22px;
  padding-left: 9px;
  ${list}
`
