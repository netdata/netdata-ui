import React from "react"
import { BoxProps } from "../templates/box"
import { ColorType, RoundProps } from "@/mixins/types"

export type SkeletonProps = BoxProps<"div"> &
  RoundProps & {
    variant?: "pulse" | "shimmer"
    background?: ColorType
  }

declare const Skeleton: React.FC<SkeletonProps>
export default Skeleton
