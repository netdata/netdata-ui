import React from "react"
import { storiesOf } from "@storybook/react"
import Flex from "src/components/templates/flex"
import Pill from "./index"

const story = storiesOf("COMPONENTS|Pills")

const Custom = () => (
  <Flex gap={4}>
    <Pill hollow background="panel" borderColor="warning" color="warning">
      Custom pill
    </Pill>
    <Pill hollow flavour="warning" borderColor="panel" round={5} height={5} width={5}>
      2
    </Pill>
  </Flex>
)

const Pills = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning">Warning</Pill>
      <Pill flavour="warningStrong">Warning Strong</Pill>
      <Pill flavour="error">Error</Pill>
      <Pill flavour="success">Success</Pill>
      <Pill flavour="neutral">Neutral</Pill>
      <Pill flavour="neutralLight">Neutral Light</Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="small">Warning</Pill>
      <Pill flavour="warningStrong" size="small">Warning Strong</Pill>
      <Pill flavour="error" size="small">Error</Pill>
      <Pill flavour="success" size="small">Success</Pill>
      <Pill flavour="neutral" size="small">Neutral</Pill>
      <Pill flavour="neutralLight" size="small">Neutral Light</Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" size="large">Warning</Pill>
      <Pill flavour="warningStrong" size="large">Warning Strong</Pill>
      <Pill flavour="error" size="large">Error</Pill>
      <Pill flavour="success" size="large">Success</Pill>
      <Pill flavour="neutral" size="large">Neutral</Pill>
      <Pill flavour="neutralLight" size="large">Neutral Light</Pill>
    </Flex>
  </Flex>
)

const PillsHollow = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning" hollow>
        Warning
      </Pill>
      <Pill flavour="warningStrong" hollow>
        Warning Strong
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
      <Pill flavour="neutralLight" hollow>
        Neutral Light
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow size="small">
        Warning
      </Pill>
      <Pill flavour="warningStrong" hollow size="small">
        Warning Strong
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
      <Pill flavour="neutralLight" hollow size="small">
        Neutral Light
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow size="large">
        Warning
      </Pill>
      <Pill flavour="warningStrong" hollow size="large">
        Warning Strong
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
      <Pill flavour="neutralLight" hollow size="large">
        Neutral Light
      </Pill>
    </Flex>
  </Flex>
)

const PillsIcon = () => (
  <Flex column gap={4}>
    <Flex gap={4}>
      <Pill flavour="warning" hollow icon="alarm">
        Warning
      </Pill>
      <Pill flavour="warningStrong" hollow icon="alarm">
        Warning Strong
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
      <Pill flavour="neutralLight" hollow icon="question">
        Neutral Light
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" icon="alarm">
        Warning
      </Pill>
      <Pill flavour="warningStrong" icon="alarm">
        Warning Strong
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
      <Pill flavour="neutralLight" icon="question">
        Neutral Light
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" hollow icon="alarm" reverse>
        Warning
      </Pill>
      <Pill flavour="warningStrong" hollow icon="alarm" reverse>
        Warning Strong
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
      <Pill flavour="neutralLight" hollow icon="question" reverse>
        Neutral Light
      </Pill>
    </Flex>
    <Flex gap={4}>
      <Pill flavour="warning" icon="alarm" reverse>
        Warning
      </Pill>
      <Pill flavour="warningStrong" icon="alarm" reverse>
        Warning Strong
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
      <Pill flavour="neutralLight" icon="question" reverse>
        Neutral Light
      </Pill>
    </Flex>
  </Flex>
)

const PillsTiny = () => (
  <Flex gap={2}>
    <Pill flavour="warning" tiny>
      Warning
    </Pill>
    <Pill flavour="warningStrong" tiny>
      Warning Strong
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
    <Pill flavour="neutralLight" tiny>
      Neutral Light
    </Pill>
  </Flex>
)

story.add("Custom", Custom)
story.add("Pills", Pills)
story.add("Pills Hollow", PillsHollow)
story.add("Pills Icon", PillsIcon)
story.add("Pills Tiny", PillsTiny)
