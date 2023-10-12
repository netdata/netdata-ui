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

import { PaddingProps, MarginProps } from "@/mixins/types"

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
  PaddingProps &
  MarginProps

export type CombinedStyledProps<El extends React.ElementType> = NativeAttributes<El> & CustomProps

export type BoxProps<T extends React.ElementType = any> = CombinedStyledProps<T> & {
  as?: React.ElementType
  sx?: any
}

declare const Box: React.FC<BoxProps<"div">>

export { Box }

export default Box
