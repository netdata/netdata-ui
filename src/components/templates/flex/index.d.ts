import {
  StyledComponentProps,
  ColorType,
  AlignSelfProps,
  PaddingProps,
  MarginProps,
  RoundProps,
  OpacityProps,
  ZIndexProps,
  PositionProps,
} from "../../../mixins/types"
import {
  DirectionProps,
  FlexibleProps,
  WrapProps,
  AlignItemsProps,
  AlignContentProps,
  JustifyContentProps,
  GapProps,
  BorderProps,
  WidthProps,
  HeightProps,
  OverflowProps,
} from "../mixins"

export interface FlexProps
  extends StyledComponentProps,
    DirectionProps,
    FlexibleProps,
    WrapProps,
    AlignItemsProps,
    AlignContentProps,
    JustifyContentProps,
    AlignSelfProps,
    MarginProps,
    PaddingProps,
    GapProps,
    OpacityProps,
    BorderProps,
    RoundProps,
    WidthProps,
    HeightProps,
    OverflowProps,
    ZIndexProps,
    PositionProps {
  background?: ColorType
}

declare const Flex: React.FC<FlexProps & JSX.IntrinsicElements["div"]>

export { Flex }

export default Flex
