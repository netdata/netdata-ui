import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import ProgressBar from "."

// Fixed label and value columns so every bar starts and ends at the same x and lengths compare.
const Row = ({ label, value, color, height }) => (
  <Flex alignItems="center" gap={2} width="360px">
    <Flex flex={false} width="72px">
      <TextSmall>{label}</TextSmall>
    </Flex>
    <Flex flex>
      <ProgressBar width={value} color={color} height={height} />
    </Flex>
    <Flex flex={false} width="36px" justifyContent="end">
      <TextSmall strong>{value}</TextSmall>
    </Flex>
  </Flex>
)

export const Basic = () => (
  <Flex width="300px">
    <ProgressBar width="42%" />
  </Flex>
)

export const Statuses = () => (
  <Flex column gap={2}>
    <Row label="Default" value="42%" />
    <Row label="OK" value="100%" color="primary" />
    <Row label="Warning" value="78%" color="warning" />
    <Row label="Critical" value="94%" color="error" />
    <Row label="Dense 4px" value="63%" color="primary" height={1} />
  </Flex>
)

export const WithValue = () => (
  <Flex width="300px">
    <ProgressBar
      value={[
        { color: "primary", width: "30%" },
        { color: "warning", width: "25%" },
        { color: "error", width: "15%" },
      ]}
    />
  </Flex>
)

export const CustomTrack = () => (
  <Flex width="300px">
    <ProgressBar width="80%" color={["blue", "aquamarine"]} background={["purple", "lilac"]} />
  </Flex>
)

export const Sizes = () => (
  <Flex column gap={2}>
    <Row label="1 (4px)" value="55%" color="primary" height={1} />
    <Row label="2 (8px)" value="55%" color="primary" height={2} />
    <Row label="3 (12px)" value="55%" color="primary" height={3} />
  </Flex>
)

export const Empty = () => (
  <Flex column gap={2} width="300px">
    <ProgressBar width="0%" />
    <ProgressBar value={[]} />
  </Flex>
)

export const Playground = args => (
  <Flex width="300px">
    <ProgressBar {...args} />
  </Flex>
)

Playground.args = { width: "60%", color: "primary", height: 2, background: "separator" }

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A thin horizontal bar that shows how much of a whole is used. Use it for a single value, such as disk usage, or for several stacked segments, such as critical, warning and clear shares.",
      },
    },
  },
  argTypes: {
    width: {
      description: "Width of the filled part as a percentage. Used when value is not set.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    color: {
      description: "Theme colour key of the filled part. Used when value is not set.",
      control: "text",
      table: { type: { summary: "string | string[]" }, defaultValue: { summary: "text" } },
    },
    value: {
      description:
        "Stacked segments, each with a color and a width. Takes precedence over width and color. A segment with width 0% is not rendered.",
      control: false,
      table: {
        type: { summary: "{ color: string; width: string }[]" },
      },
    },
    height: {
      description: "Bar height in size units of 4px.",
      control: { type: "number", min: 1, max: 6 },
      table: { type: { summary: "number" }, defaultValue: { summary: "2" } },
    },
    background: {
      description: "Theme colour key of the track behind the segments.",
      control: "text",
      table: { type: { summary: "string | string[]" }, defaultValue: { summary: "separator" } },
    },
    containerWidth: {
      description: "Width of the whole track.",
      control: "text",
      table: { type: { summary: "string" }, defaultValue: { summary: "100%" } },
    },
    className: {
      description: "Class name applied to the track.",
      control: false,
      table: { type: { summary: "string" } },
    },
    "data-testid": {
      description: "Test id of the track.",
      control: false,
      table: { type: { summary: "string" }, defaultValue: { summary: "progressBar" } },
    },
  },
}
