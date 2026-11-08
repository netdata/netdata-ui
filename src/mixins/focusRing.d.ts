import { RuleSet } from "styled-components"
import { ColorType } from "./types"

export interface FocusRingOptions {
  offset?: number
  color?: ColorType
  radius?: number | string
}

export declare const focusRingAt: (options?: FocusRingOptions) => RuleSet<any>
export declare const focusRing: RuleSet<any>
export declare const focusRingOutline: RuleSet<any>
export declare const fieldFocusRing: RuleSet<any>
export declare const fieldFocusWithinRing: RuleSet<any>
