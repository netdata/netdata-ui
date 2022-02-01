import React from "react"
import { storiesOf } from "@storybook/react"
import Flex from "src/components/templates/flex"
import Pill from "./index"
import MasterCard from "./mastercard";

const story = storiesOf("COMPONENTS|Pills")

const Custom = () => (
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

const Pills = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning">Warning</Pill>
      <Pill flavour="error">Error</Pill>
      <Pill flavour="success">Success</Pill>
      <Pill flavour="neutral">Neutral</Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="small">Warning</Pill>
      <Pill flavour="error" size="small">Error</Pill>
      <Pill flavour="success" size="small">Success</Pill>
      <Pill flavour="neutral" size="small">Neutral</Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="large">Warning</Pill>
      <Pill flavour="error" size="large">Error</Pill>
      <Pill flavour="success" size="large">Success</Pill>
      <Pill flavour="neutral" size="large">Neutral</Pill>
    </Flex>
  </Flex>
)

const PillsHollow = () => (
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

const PillsLabelIcon = () => (
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

const PillsIcon = () => (
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

const PillsTiny = () => (
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

const MasterCards = () => (
  <Flex column gap={4}>
    <Flex gap={2}>
      <MasterCard pillLeft={{ flavour: "error", text: "3" }} pillRight={{ flavour: "warning", text: "2" }} />
      <MasterCard />
    </Flex>
    <Flex gap={2}>
      <MasterCard pillLeft={{ flavour: "error", text: "3" }} pillRight={{ flavour: "warning", text: "2" }} size="large" />
      <MasterCard size="large" />
    </Flex>
  </Flex>
)

story.add("Custom", Custom)
story.add("Pills", Pills)
story.add("Pills Hollow", PillsHollow)
story.add("Pills Icon with Label", PillsLabelIcon)
story.add("Pills Icon", PillsIcon)
story.add("Pills Tiny", PillsTiny)
story.add("MasterCards", MasterCards)
