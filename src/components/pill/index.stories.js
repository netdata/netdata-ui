import React from "react"
import AlertMasterCard from "./alertMastercard"
import { iconsList } from "@/components/icon/iconsList"
import Flex from "@/components/templates/flex"
import Pill from "."
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
        onClick={() => console.log("test")}
        pillLeft={{ flavour: "error", text: "3" }}
        pillRight={{ flavour: "warning", text: "2" }}
        pillEnd={{ flavour: "clear", text: "223" }}
        size="small"
      />
      <AlertMasterCard size="small" />
    </Flex>
    <Flex gap={2}>
      <AlertMasterCard
        onClick={() => console.log("test")}
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

export const Basic = args => <Pill {...args} />

export default {
  component: Pill,
  args: {
    children: "My pill",
    flavour: "neutral",
    hollow: false,
    reverse: false,
    size: "large",
    tiny: false,
    semi: false,
  },
  argTypes: {
    children: { control: "text" },
    flavour: {
      options: ["neutral", "success", "clear", "warning", "error", "stale"],
      control: { type: "select" },
    },
    hollow: { control: "boolean" },
    semi: { control: "boolean" },
    normal: { control: "boolean" },
    reverse: { control: "boolean" },
    size: {
      options: ["default", "large", "normal", "small", "tiny"],
      control: { type: "select" },
    },
    textSize: {
      options: ["default", "large", "normal", "small", "tiny"],
      control: { type: "select" },
    },
    tiny: { control: "boolean" },
    icon: {
      options: Object.keys(iconsList),
      control: { type: "select" },
    },
  },
}
