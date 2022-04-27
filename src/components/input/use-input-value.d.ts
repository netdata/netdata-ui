import { ChangeEvent } from "react"

export interface UseInputValueProps {
  maxChars?: number
  onChange?: (e: ChangeEvent) => void
  value?: string
}

declare const useInputValue: (props: UseInputValueProps) =>
  [
    string,
    (e: ChangeEvent) => void,
    string,
    boolean,
    {
      setIsDirty: (state: boolean) => void,
      setValue: (state: string) => void,
      resetValue: () => void
    }
  ]

export { useInputValue }

export default useInputValue
