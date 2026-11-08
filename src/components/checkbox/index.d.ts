import { ComponentPropsWithRef, ReactElement } from "react"

export { Checkbox } from "./checkbox"
export type { CheckboxProps } from "./checkbox"

export declare function useCheckboxesList(
  values: boolean[],
  handlers: Array<(checked: boolean) => void>
): [boolean, boolean, () => void]

export type CheckboxIndicatorProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  checked?: boolean
  shape?: "checkbox" | "radio"
  size?: number | string
  markSize?: number
}

export declare function CheckboxIndicator(props: CheckboxIndicatorProps): ReactElement
