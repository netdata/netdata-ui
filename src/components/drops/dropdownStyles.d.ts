import { RuleSet } from "styled-components"
import { DarkTheme, DefaultTheme, WrappedTheme } from "../../theme"

export type DropdownSelectionStyle = "marker" | "quiet"
type DropdownTheme = typeof DefaultTheme | typeof DarkTheme | WrappedTheme["theme"]

export const dropdownBorder: { side: "all"; size: "1px"; type: "solid"; color: "border" }
export const dropdownRound: number
export const insetMenuRound: number
export const insetMenuPadding: number
export const insetMenuRowRound: number
export function menuSelectionMarker(props: { theme: DropdownTheme }): string

export function getDropdownOptionColors(
  theme: DropdownTheme,
  selectionStyle?: DropdownSelectionStyle,
  surface?: string
): { hover: string; selected: string; selectedHover: string; selectedText: string }

export function withDropdownDefaults<T extends { background?: unknown }>(
  props: T
): T & { border?: unknown; round?: unknown }
export function floatingShadowValue(theme: DropdownTheme): string
export const floatingShadow: RuleSet<object>
export const floatingDropShadow: RuleSet<object>
