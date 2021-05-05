import React from "react"
import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import Flex from "src/components/templates/flex"
import Pill from "./index"

const story = storiesOf("COMPONENTS|Pills")

const Custom = () => (
  <Pill hollow background="panel" borderColor="warning" color="warning">
    Custom pill
  </Pill>
)

const Pills = () => (
  <Flex gap={4}>
    <Pill flavour="warning">Warning</Pill>
    <Pill flavour="error">Error</Pill>
    <Pill flavour="success">Success</Pill>
    <Pill flavour="neutral">Neutral</Pill>
  </Flex>
)

const PillsHollow = () => (
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
)

const PillsIcon = () => (
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

story.add("Custom", Custom)
story.add("Pills", Pills)
story.add("Pills Hollow", PillsHollow)
story.add("Pills Icon", PillsIcon)
story.add("Pills Tiny", PillsTiny)
