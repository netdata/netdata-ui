type MarginType =
  | [number]
  | [number, number]
  | [number, number, number]
  | [number, number, number, number]

export interface MarginProps {
  margin?: MarginType
}
