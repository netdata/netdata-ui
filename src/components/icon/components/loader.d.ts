import { ComponentPropsWithRef, ReactElement } from "react"
import { ColorType } from "@/mixins/types"

export type RingLoaderProps = Omit<ComponentPropsWithRef<"span">, "color"> & {
  variant: "ring"
  size?: number | string
  thickness?: number
  color?: ColorType
  duration?: string
}

export interface LogoLoaderProps {
  variant?: "logo"
  className?: string
}

export declare function LoaderIcon(props: RingLoaderProps | LogoLoaderProps): ReactElement
