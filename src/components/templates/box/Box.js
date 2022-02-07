import styled from "styled-components"
import alignSelf from "src/mixins/alignSelf"
import margin from "src/mixins/margin"
import padding from "src/mixins/padding"
import round from "src/mixins/round"
import opacity from "src/mixins/opacity"
import position from "src/mixins/position"
import zIndex from "src/mixins/zIndex"
import cursor from "src/mixins/cursor"
import height from "src/components/templates/mixins/height"
import width from "src/components/templates/mixins/width"
import overflow from "src/components/templates/mixins/overflow"
import background from "src/components/templates/mixins/background"

import alignContent from "src/components/templates/mixins/alignContent"
import gap from "src/components/templates/mixins/gap"
import border from "src/components/templates/mixins/border"
import shadow from "src/components/templates/mixins/shadow"
import pseudos from "src/components/templates/mixins/pseudos"
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
  ${shadow}
  ${pseudos}
  ${styledSystemPosition}
  ${sx}
`

export default Box
