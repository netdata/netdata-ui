import React from "react"

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
  WrapProps

export type CombinedStyledProps<El extends React.ElementType> = NativeAttributes<El> & CustomProps

export type BoxProps<T extends React.ElementType = any> = CombinedStyledProps<T> & {
  as?: React.ElementType
  sx?: CombinedStyledProps<T>
}
