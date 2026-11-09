type ComposingKeyboardEvent = Pick<KeyboardEvent, "isComposing" | "keyCode">

export declare const isComposingKey: (
  event: ComposingKeyboardEvent | { nativeEvent: ComposingKeyboardEvent }
) => boolean

declare const useKeyboardEsc: (onEsc?: ((event: KeyboardEvent) => void) | null) => void

export default useKeyboardEsc
