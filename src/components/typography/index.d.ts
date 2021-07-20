import {
  StyledComponentProps,
  ColorType,
  AlignSelfProps,
  MarginProps,
  PaddingProps,
  OpacityProps,
  CSSPropertiesValueType,
} from "../../mixins/types"
import {
  TextAlignType,
  TextDecorationType,
  TruncateType,
  WhiteSpaceProps,
  WordBreakProps,
} from "./mixins"

export interface TypographyProps
  extends StyledComponentProps,
    AlignSelfProps,
    TextAlignType,
    TextDecorationType,
    TruncateType,
    WhiteSpaceProps,
    WordBreakProps,
    MarginProps,
    PaddingProps,
    OpacityProps {
  strong?: boolean
  color?: ColorType
  truncate?: boolean
  textTransform?: "capitalize" | "uppercase" | "lowercase" | "none"
}

type HeadingType = React.FC<
  TypographyProps &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
>

declare const H0: HeadingType
declare const H1: HeadingType
declare const H2: HeadingType
declare const H3: HeadingType
declare const H4: HeadingType
declare const H5: HeadingType
declare const H6: HeadingType

type TextType = React.FC<
  TypographyProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
>

declare const TextFemto: TextType
declare const TextNano: TextType
declare const TextMicro: TextType
declare const TextSmall: TextType
declare const Text: TextType
declare const TextBig: TextType
declare const TextBigger: TextType
declare const TextHuge: TextType

declare const makeTypography: (
  Component: any,
  options: { fontSize: CSSPropertiesValueType; lineHeight: CSSPropertiesValueType; strong: boolean }
) => HeadingType
declare const makeH0: (Component: any) => HeadingType
declare const makeH1: (Component: any) => HeadingType
declare const makeH2: (Component: any) => HeadingType
declare const makeH3: (Component: any) => HeadingType
declare const makeH4: (Component: any) => HeadingType
declare const makeH5: (Component: any) => HeadingType
declare const makeH6: (Component: any) => HeadingType
declare const makeFemto: (Component: any) => TextType
declare const makeNano: (Component: any) => TextType
declare const makeMicro: (Component: any) => TextType
declare const makeSmall: (Component: any) => TextType
declare const makeText: (Component: any) => TextType
declare const makeBig: (Component: any) => TextType
declare const makeBigger: (Component: any) => TextType
declare const makeHuge: (Component: any) => TextType

interface ListProps extends AlignSelfProps, MarginProps, PaddingProps {}

declare const List: React.FC<
  ListProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
>

declare const ListItem: React.FC<
  ListProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>
>

export {
  H0,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextFemto,
  TextNano,
  TextMicro,
  TextSmall,
  Text,
  TextBig,
  TextBigger,
  TextHuge,
  makeTypography,
  makeH0,
  makeH1,
  makeH2,
  makeH3,
  makeH4,
  makeH5,
  makeH6,
  makeFemto,
  makeNano,
  makeMicro,
  makeSmall,
  makeText,
  makeBig,
  makeBigger,
  makeHuge,
  List,
  ListItem,
}
