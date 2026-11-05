import React from "react"
import CopyToClipboard from "./index"
import { Text, TextSmall, H3 } from "@/components/typography"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"

export default {
  title: "Components/CopyToClipboard",
  component: CopyToClipboard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Wraps any content so a click copies a string to the clipboard and shows a short Copied! or Failed to copy! note at the pointer. Use it for values people paste elsewhere, like metric contexts, node IDs and URLs.",
      },
    },
  },
  argTypes: {
    text: {
      description: "The string to copy. Non-strings fail with onError.",
      control: "text",
      table: { type: { summary: "string" } },
    },
    children: {
      description: "Content that acts as the click target.",
      control: false,
      table: { type: { summary: "ReactNode" } },
    },
    disabled: {
      description: "Ignore clicks and do not copy.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    onCopy: {
      description: "Called with the copied text after a successful copy.",
      action: "onCopy",
      table: { type: { summary: "(text: string) => void" } },
    },
    onError: {
      description: "Called with an Error when the copy fails.",
      action: "onError",
      table: { type: { summary: "(error: Error) => void" } },
    },
    style: {
      description: "Inline style for the wrapping span.",
      control: false,
      table: { type: { summary: "CSSProperties" } },
    },
    className: {
      description: "Class name for the wrapping span.",
      control: false,
      table: { type: { summary: "string" } },
    },
  },
}

const Template = args => <CopyToClipboard {...args} />

export const Default = Template.bind({})
Default.args = {
  text: "Hello, World!",
  children: <Text>Click me to copy</Text>,
  disabled: false,
}

export const WithTextSmall = Template.bind({})
WithTextSmall.args = {
  text: "system.cpu.usage",
  children: <TextSmall color="textLite">system.cpu.usage</TextSmall>,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  text: "This is the text that will be copied",
  children: (
    <Box display="flex" alignItems="center" gap={1}>
      <Icon name="copy" size="small" />
      <Text>Copy text</Text>
    </Box>
  ),
}

export const ChartContextExample = Template.bind({})
ChartContextExample.args = {
  text: "system.cpu, system.memory, system.disk",
  children: (
    <Box display="flex" alignItems="center" gap={1}>
      <H3>System Overview</H3>
      <CopyToClipboard text="system.cpu, system.memory, system.disk">
        <TextSmall color="textLite" style={{ cursor: "pointer" }}>
          • system.cpu, system.memory, system.disk
        </TextSmall>
      </CopyToClipboard>
    </Box>
  ),
}

export const LongText = Template.bind({})
LongText.args = {
  text: "This is a very long piece of text that demonstrates copying longer content to the clipboard. It includes multiple sentences and should work just as well as shorter text.",
  children: <Text>Copy long text</Text>,
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: "This won't be copied",
  children: <Text style={{ opacity: 0.4 }}>Disabled copy</Text>,
  disabled: true,
}

export const MultipleExamples = () => (
  <Box display="flex" flexDirection="column" gap={4} padding={4}>
    <Box display="flex" gap={4} justifyContent="center">
      <CopyToClipboard text="Short text">
        <Text>Short</Text>
      </CopyToClipboard>
      <CopyToClipboard text="Medium length text example">
        <Text>Medium</Text>
      </CopyToClipboard>
      <CopyToClipboard text="This is a very long text that will be copied to clipboard">
        <Text>Long</Text>
      </CopyToClipboard>
    </Box>
  </Box>
)

export const WithCallbacks = Template.bind({})
WithCallbacks.args = {
  text: "Callback example",
  children: <Text>Copy with callbacks</Text>,
}
