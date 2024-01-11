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
import flex from "@/components/templates/mixins/flex"
import wrap from "@/components/templates/mixins/wrap"
import alignItems from "@/components/templates/mixins/alignItems"
import alignContent from "@/components/templates/mixins/alignContent"
import justifyContent from "@/components/templates/mixins/justifyContent"
import gap from "@/components/templates/mixins/gap"
import direction from "@/components/templates/mixins/direction"
import border from "@/components/templates/mixins/border"
import pseudos from "@/components/templates/mixins/pseudos"
import { fontColor } from "@/components/typography/typography"

import { position as styledSystemPosition } from "styled-system"
import css from "@styled-system/css"

export const sx = props => css(props.sx)(props)

const Flex = Component => styled(Component)`
  display: flex;

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

  ${fontColor}
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

export default Flex
