export interface AlignProps {
  align?:
    | { top: "top" }
    | { top: "top"; right: "left" }
    | { top: "top"; right: "right" }
    | { top: "top"; left: "left" }
    | { top: "top"; left: "right" }
    | { top: "bottom" }
    | { top: "bottom"; right: "left" }
    | { top: "bottom"; right: "right" }
    | { top: "bottom"; left: "left" }
    | { top: "bottom"; left: "right" }
    | { bottom: "bottom" }
    | { bottom: "bottom"; right: "left" }
    | { bottom: "bottom"; right: "right" }
    | { bottom: "bottom"; left: "left" }
    | { bottom: "bottom"; left: "right" }
    | { bottom: "top" }
    | { bottom: "top"; right: "left" }
    | { bottom: "top"; right: "right" }
    | { bottom: "top"; left: "left" }
    | { bottom: "top"; left: "right" }
    | { right: "right" }
    | { left: "left" }
    | {}
}

export interface StretchProps {
  stretch?: boolean | "width" | "align"
}
