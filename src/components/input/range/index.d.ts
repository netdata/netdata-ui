import { ChangeEvent, FC, SyntheticEvent } from "react"

export interface RangeInputProps {
  "data-testid"?: string
  max?: number
  min?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onInput?: (e: SyntheticEvent<HTMLButtonElement>) => void
  step?: number
  value: number
}

declare const RangeInput: FC<RangeInputProps>

export { RangeInput }

export default RangeInput
