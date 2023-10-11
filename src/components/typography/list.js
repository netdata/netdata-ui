import styled, { css } from "styled-components"
import alignSelf from "@/mixins/alignSelf"
import margin from "@/mixins/margin"
import padding from "@/mixins/padding"

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
