import type { RefObject } from "react"

type FocusableElement = HTMLElement | SVGElement

export function getFocusCandidates(
  container: ParentNode,
  options?: { includeHiddenInputs?: boolean }
): FocusableElement[]

export function trapTabFocus(
  event: Pick<KeyboardEvent, "key" | "shiftKey" | "preventDefault">,
  candidates: readonly FocusableElement[],
  options: { active: Element | null; outside?: boolean; emptyTarget?: FocusableElement }
): void

export function useFocusTrap(
  container: HTMLElement | null,
  options?: { restoreFocus?: RefObject<FocusableElement | null> }
): void
