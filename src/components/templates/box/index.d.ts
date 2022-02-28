import React from "react"

import {
  ColorType,
  PaddingProps,
  MarginProps,
  RoundProps,
  OpacityProps,
  ZIndexProps,
  PositionProps,
  CursorProps,
} from "src/mixins/types"
import { CSSProperties } from "styled-components"

import {
  AlignContentProps,
  AlignItemsProps,
  BorderProps,
  DirectionProps,
  FlexibleProps,
  GapProps,
  HeightProps,
  JustifyContentProps,
  OverflowProps,
  WidthProps,
  WrapProps,
} from "../mixins"

type PostionDirection = {
  top?: number | string
  right?: number | string
  left?: number | string
  bottom?: number | string
}

export type NativeAttributes<El extends React.ElementType> = React.ComponentPropsWithRef<El>
export type CustomProps = AlignContentProps &
  AlignItemsProps &
  BorderProps &
  DirectionProps &
  FlexibleProps &
  GapProps &
  HeightProps &
  JustifyContentProps &
  OverflowProps &
  WidthProps &
  WrapProps &
  MarginProps &
  PaddingProps &
  CursorProps &
  ColorType &
  RoundProps &
  OpacityProps &
  ZIndexProps &
  PositionProps &
  PostionDirection

export type CombinedStyledProps<El extends React.ElementType> = NativeAttributes<El> & CustomProps

export type BoxProps<T extends React.ElementType = any> = CombinedStyledProps<T> & {
  as?: React.ElementType
  sx?: CSSProperties
}

declare const Box: React.FC<BoxProps<"div">>

export { Box }

export default Box
