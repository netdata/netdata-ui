import React from "react"
import AlertMasterCard from "./alertMastercard"
import { iconsList } from "@/components/icon/iconsList"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import Pill, { MarkCounts, StatusWord } from "."
import MasterCard from "./mastercard"

export const Custom = () => (
  <Flex gap={4}>
    <Pill hollow background="panel" borderColor="warning" color="warning">
      Custom pill
    </Pill>
    <Pill hollow flavour="warning" borderColor="panel" round={5} height={5} width={5}>
      2
    </Pill>
    <Pill hollow flavour="neutral" borderColor="tabsBorder">
      Offline
    </Pill>
  </Flex>
)

export const Pills = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning">Warning</Pill>
      <Pill flavour="error">Error</Pill>
      <Pill flavour="success">Success</Pill>
      <Pill flavour="neutral">Neutral</Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="small">
        Warning
      </Pill>
      <Pill flavour="error" size="small">
        Error
      </Pill>
      <Pill flavour="success" size="small">
        Success
      </Pill>
      <Pill flavour="neutral" size="small">
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="large">
        Warning
      </Pill>
      <Pill flavour="error" size="large">
        Error
      </Pill>
      <Pill flavour="success" size="large">
        Success
      </Pill>
      <Pill flavour="neutral" size="large">
        Neutral
      </Pill>
    </Flex>
  </Flex>
)

export const PillsHollow = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning" hollow>
        Warning
      </Pill>
      <Pill flavour="error" hollow>
        Error
      </Pill>
      <Pill flavour="success" hollow>
        Success
      </Pill>
      <Pill flavour="neutral" hollow>
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow size="small">
        Warning
      </Pill>
      <Pill flavour="error" hollow size="small">
        Error
      </Pill>
      <Pill flavour="success" hollow size="small">
        Success
      </Pill>
      <Pill flavour="neutral" hollow size="small">
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow size="large">
        Warning
      </Pill>
      <Pill flavour="error" hollow size="large">
        Error
      </Pill>
      <Pill flavour="success" hollow size="large">
        Success
      </Pill>
      <Pill flavour="neutral" hollow size="large">
        Neutral
      </Pill>
    </Flex>
  </Flex>
)

export const PillsLabelIcon = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning" hollow icon="alarm">
        Warning
      </Pill>
      <Pill flavour="error" hollow icon="warning_triangle">
        Error
      </Pill>
      <Pill flavour="success" hollow icon="checkmark_s">
        Success
      </Pill>
      <Pill flavour="neutral" hollow icon="question">
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" icon="alarm">
        Warning
      </Pill>
      <Pill flavour="error" icon="warning_triangle">
        Error
      </Pill>
      <Pill flavour="success" icon="checkmark_s">
        Success
      </Pill>
      <Pill flavour="neutral" icon="question">
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow icon="alarm" reverse>
        Warning
      </Pill>
      <Pill flavour="error" hollow icon="warning_triangle" reverse>
        Error
      </Pill>
      <Pill flavour="success" hollow icon="checkmark_s" reverse>
        Success
      </Pill>
      <Pill flavour="neutral" hollow icon="question" reverse>
        Neutral
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" icon="alarm" reverse>
        Warning
      </Pill>
      <Pill flavour="error" icon="warning_triangle" reverse>
        Error
      </Pill>
      <Pill flavour="success" icon="checkmark_s" reverse>
        Success
      </Pill>
      <Pill flavour="neutral" icon="question" reverse>
        Neutral
      </Pill>
    </Flex>
  </Flex>
)

export const PillsIcon = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning" hollow icon="alarm" iconSize="18px" />
      <Pill flavour="error" hollow icon="warning_triangle" iconSize="18px" />
      <Pill flavour="success" hollow icon="checkmark_s" iconSize="18px" />
      <Pill flavour="neutral" hollow icon="information" iconSize="18px" />
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" icon="alarm" iconSize="18px" />
      <Pill flavour="error" icon="warning_triangle" iconSize="18px" />
      <Pill flavour="success" icon="checkmark_s" iconSize="18px" />
      <Pill flavour="neutral" icon="information" iconSize="18px" />
    </Flex>
  </Flex>
)

export const PillsTiny = () => (
  <Flex gap={2}>
    <Pill flavour="warning" tiny>
      Warning
    </Pill>
    <Pill flavour="error" tiny>
      Error
    </Pill>
    <Pill flavour="success" tiny>
      Success
    </Pill>
    <Pill flavour="neutral" tiny>
      Neutral
    </Pill>
  </Flex>
)

export const MasterCards = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <MasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
      />
      <MasterCard />
    </Flex>
    <Flex gap={2}>
      <MasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
        size="large"
      />
      <MasterCard size="large" />
    </Flex>
  </Flex>
)

export const AlertMasterCards = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <AlertMasterCard
        onClick={() => {}}
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
        size="small"
      />
      <AlertMasterCard size="small" />
    </Flex>
    <Flex gap={2}>
      <AlertMasterCard
        onClick={() => {}}
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
      />
      <AlertMasterCard />
    </Flex>
    <Flex gap={2}>
      <AlertMasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
        size="large"
      />
      <AlertMasterCard size="large" />
    </Flex>
  </Flex>
)

const allFlavours = [
  "neutral",
  "success",
  "warning",
  "error",
  "stale",
  "muted",
  "idleClear",
  "idleWarning",
  "idleError",
]

export const FlavoursBySize = () => (
  <Flex column gap={3}>
    {[
      { tiny: true, label: "tiny 14px" },
      { size: "small", label: "small 18px" },
      { size: "default", label: "default 20px" },
      { size: "large", label: "large 24px" },
    ].map(({ label, ...props }) => (
      <Flex key={label} gap={2} alignItems="center">
        {allFlavours.map(flavour => (
          <Pill key={flavour} flavour={flavour} {...props}>
            {flavour}
          </Pill>
        ))}
        <Pill hollow {...props}>
          {label}
        </Pill>
      </Flex>
    ))}
  </Flex>
)

export const PillsSemi = () => (
  <Flex gap={4}>
    {["neutral", "success", "warning", "error", "stale"].map(flavour => (
      <Pill key={flavour} flavour={flavour} hollow semi>
        {flavour}
      </Pill>
    ))}
  </Flex>
)

export const PillsCounts = () => (
  <Flex gap={2}>
    {["1", "12", "128", "2048"].map(count => (
      <Pill key={count} flavour="error" size="small">
        {count}
      </Pill>
    ))}
  </Flex>
)

export const MasterCardsIdle = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <MasterCard />
      <MasterCard pillEnd={{}} />
      <MasterCard pillLeft={{ flavour: "error", text: "1" }} pillRight={{ text: "0" }} />
    </Flex>
    <Flex gap={2}>
      <AlertMasterCard pillEnd={{}} />
      <AlertMasterCard labelProps={{ hidden: true }} pillLeft={{ flavour: "error", text: "3" }} />
    </Flex>
  </Flex>
)

export const Basic = args => <Pill {...args} />

export const ClickablePills = () => (
  <Flex gap={2}>
    <Pill flavour="error" size="small" onClick={() => {}}>
      3 critical
    </Pill>
    <Pill flavour="warning" size="small" onClick={() => {}}>
      2 warning
    </Pill>
    <Pill flavour="neutral" hollow size="small" onClick={() => {}}>
      system.cpu
    </Pill>
  </Flex>
)

export const MasterCardSizesAndRound = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <MasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        round={1}
      />
      <MasterCard
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        size="large"
        round={1}
      />
    </Flex>
    <Flex gap={2}>
      <MasterCard pillLeft={{ icon: "alarm", flavour: "error" }} pillRight={{ text: "12" }} />
    </Flex>
  </Flex>
)

const looks = [
  { label: "soft (default)", props: {} },
  { label: "filled", props: { filled: true } },
  { label: "hollow", props: { hollow: true } },
  { label: "hollow semi", props: { hollow: true, semi: true } },
]

const lookSizes = [
  { label: "tiny 14px", props: { tiny: true } },
  { label: "small 18px", props: { size: "small" } },
  { label: "default 20px", props: {} },
  { label: "large 24px", props: { size: "large" } },
]

export const LooksByToneAndSize = () => (
  <Flex column gap={6}>
    {looks.map(look => (
      <Flex key={look.label} column gap={2}>
        <Text strong>{look.label}</Text>
        {lookSizes.map(lookSize => (
          <Flex key={lookSize.label} gap={2} alignItems="center">
            {allFlavours.map(flavour => (
              <Pill key={flavour} flavour={flavour} {...look.props} {...lookSize.props}>
                {flavour}
              </Pill>
            ))}
            <Text color="textLite">{lookSize.label}</Text>
          </Flex>
        ))}
      </Flex>
    ))}
  </Flex>
)

export const Dots = () => (
  <Flex column gap={3}>
    {[
      { label: "soft", props: {} },
      { label: "filled", props: { filled: true } },
      { label: "hollow", props: { hollow: true } },
    ].map(({ label, props }) => (
      <Flex key={label} gap={2} alignItems="center">
        <Pill flavour="success" dot {...props}>
          Running
        </Pill>
        <Pill flavour="error" dot {...props}>
          Critical
        </Pill>
        <Pill flavour="warning" dot {...props}>
          Warning
        </Pill>
        <Pill flavour="stale" dot="hollow" {...props}>
          Stale
        </Pill>
        <Pill flavour="muted" dot="hollow" {...props}>
          Disabled
        </Pill>
        <Text color="textLite">{label}</Text>
      </Flex>
    ))}
    <Flex gap={2} alignItems="center">
      {lookSizes.map(({ label, props }) => (
        <Pill key={label} flavour="error" dot {...props}>
          {label}
        </Pill>
      ))}
    </Flex>
  </Flex>
)

export const StatusWords = () => (
  <Flex column gap={2}>
    <StatusWord tone="success" detail="4 collectors">
      Running
    </StatusWord>
    <StatusWord tone="error" detail="since 14:02 · 97.3%">
      Critical
    </StatusWord>
    <StatusWord tone="warning" detail="iowait 18%">
      Warning
    </StatusWord>
    <StatusWord tone="stale" dot="hollow" detail="last seen 3m ago">
      Stale
    </StatusWord>
    <StatusWord tone="muted" dot="hollow">
      Disabled
    </StatusWord>
  </Flex>
)

export const MarkCountsRow = () => (
  <MarkCounts
    counts={[
      { tone: "error", count: 3, label: "critical" },
      { tone: "warning", count: 12, label: "warning" },
      { tone: "success", count: 128, label: "clear" },
      { tone: "stale", dot: "hollow", count: 2, label: "stale" },
    ]}
  />
)

const flavourOptions = [
  "neutral",
  "success",
  "clear",
  "warning",
  "error",
  "critical",
  "stale",
  "muted",
  "idleClear",
  "idleWarning",
  "idleError",
]
const sizeOptions = ["default", "normal", "small", "large"]

export default {
  title: "Components/Pill",
  component: Pill,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A compact rounded label for a status, a count or a short tag. MasterCard and AlertMasterCard join several pills into one segmented track, e.g. critical, warning and clear alert counts.",
      },
    },
  },
  args: {
    children: "My pill",
    flavour: "neutral",
    filled: false,
    hollow: false,
    reverse: false,
    size: "large",
    tiny: false,
    semi: false,
  },
  argTypes: {
    children: {
      description: "Pill text. Omit it for an icon-only pill.",
      control: "text",
      table: { type: { summary: "ReactNode" } },
    },
    flavour: {
      description:
        "Status colour. muted is secondary text with no status hue. Unknown values fall back to neutral.",
      options: flavourOptions,
      control: { type: "select" },
      table: {
        type: { summary: flavourOptions.join(" | ") },
        defaultValue: { summary: "neutral" },
      },
    },
    filled: {
      description:
        "Saturated fill with bright text (the look before soft became the default). hollow wins over filled.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    dot: {
      description: "Status dot before the label: true or filled for a 7px dot, hollow for a ring.",
      options: [false, true, "filled", "hollow"],
      control: { type: "select" },
      table: {
        type: { summary: 'boolean | "filled" | "hollow"' },
        defaultValue: { summary: "false" },
      },
    },
    hollow: {
      description: "Transparent fill with a coloured border and text.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    semi: {
      description: "With hollow, uses the soft status tint as the fill.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    normal: {
      description: "Regular text weight. Set to false for bold text.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "true" } },
    },
    reverse: {
      description: "Places the icon after the text.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    size: {
      description: "Pill height and padding: small 18px, default and normal 20px, large 24px.",
      options: sizeOptions,
      control: { type: "select" },
      table: { type: { summary: sizeOptions.join(" | ") }, defaultValue: { summary: "default" } },
    },
    textSize: {
      description: "Overrides the text size independently of the pill size.",
      options: [...sizeOptions, "tiny"],
      control: { type: "select" },
      table: { type: { summary: "default | large | normal | small | tiny" } },
    },
    tiny: {
      description: "14px high pill with the smallest text.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    icon: {
      description: "Icon name, or a React element rendered as is.",
      options: Object.keys(iconsList),
      control: { type: "select" },
      table: { type: { summary: "string | ReactNode" } },
    },
    iconSize: {
      description: "Icon width and height. Defaults to 14px, or 16px for the large size.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    background: {
      description: "Theme colour key that overrides the flavour fill.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    borderColor: {
      description: "Theme colour key for the border.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    color: {
      description: "Theme colour key for the text and icon.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    round: {
      description: "Corner radius. true is fully rounded, false is a small radius.",
      control: false,
      table: { type: { summary: "boolean | number | object" }, defaultValue: { summary: "true" } },
    },
    textProps: {
      description: "Props passed to the text element.",
      control: false,
      table: { type: { summary: "object" } },
    },
    onClick: {
      description: "Makes the pill clickable and shows a pointer cursor.",
      action: "onClick",
      control: false,
      table: { type: { summary: "(e: SyntheticEvent) => void" } },
    },
    "data-testid": {
      description: "Test id of the pill. Its text and icons get -text and -icon suffixes.",
      control: false,
      table: { type: { summary: "string" }, defaultValue: { summary: "pill" } },
    },
  },
}
