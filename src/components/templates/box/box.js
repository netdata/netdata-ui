import styled from "styled-components"
import alignSelf from "@/mixins/alignSelf"
import margin from "@/mixins/margin"
import padding from "@/mixins/padding"
import round from "@/mixins/round"
import opacity from "@/mixins/opacity"
import position from "@/mixins/position"
import zIndex from "@/mixins/zIndex"
import cursor from "@/mixins/cursor"
import height from "@/components/templates/mixins/height"
import width from "@/components/templates/mixins/width"
import overflow from "@/components/templates/mixins/overflow"
import background from "@/components/templates/mixins/background"

import alignContent from "@/components/templates/mixins/alignContent"
import gap from "@/components/templates/mixins/gap"
import border from "@/components/templates/mixins/border"
import pseudos from "@/components/templates/mixins/pseudos"
//styled system custom
import { position as styledSystemPosition } from "styled-system"
import css from "@styled-system/css"

export const sx = props => css(props.sx)(props)

const Box = Component => styled(Component)`
  box-sizing: border-box;

  ${alignContent}
  ${alignSelf}

  ${position}
  ${margin}
  ${padding}
  ${gap}
  ${width}
  ${height}

  ${background}
  ${opacity}
  ${border}
  ${round}
  ${overflow}
  ${zIndex}
  ${cursor}
  ${pseudos}
  ${styledSystemPosition}
  ${sx}
`

export default Box
