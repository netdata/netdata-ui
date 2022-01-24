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
import flex from "src/components/templates/mixins/flex"
import wrap from "src/components/templates/mixins/wrap"
import alignItems from "src/components/templates/mixins/alignItems"
import alignContent from "src/components/templates/mixins/alignContent"
import justifyContent from "src/components/templates/mixins/justifyContent"
import gap from "src/components/templates/mixins/gap"
import direction from "src/components/templates/mixins/direction"
import border from "src/components/templates/mixins/border"
import shadow from "src/components/templates/mixins/shadow"
import pseudos from "src/components/templates/mixins/pseudos"
import { position as styledSystemPosition } from "styled-system"

const Box = Component => styled(Component)`
  box-sizing: border-box;

  ${flex}
  ${direction}
  ${wrap}
  ${alignItems}
  ${alignContent}
  ${justifyContent}
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
`

export default Box
