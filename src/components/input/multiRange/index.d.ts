import { FC, SyntheticEvent } from "react"

export interface MultiRangeInputProps {
  "data-testid"?: string
  initMax?: number
  initMin?: number
  max?: number
  min?: number
  onChange: ({ max, min }) => void
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  onInput?: ({ max, min }) => void
  step?: number
  TextComponent?: FC
}

declare const MultiRangeInput: FC<MultiRangeInputProps>

export { MultiRangeInput }

export default MultiRangeInput
