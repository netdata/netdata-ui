import React from "react"
import { Button } from "@/components/button"
import { H4 } from "@/components/typography"
import Flex from "@/components/templates/flex"
import Topbar from "."

const actions = [
  <Button key="search" icon="search" flavour="borderless" neutral />,
  <Button key="settings" icon="gear" flavour="borderless" neutral />,
  <Button key="invite" label="Invite" />,
]

export const Default = () => (
  <Flex column padding={[2, 3]} border={{ side: "bottom", color: "border" }}>
    <Topbar mainChild={<H4>War Room</H4>}>{actions}</Topbar>
  </Flex>
)

export const Extended = () => (
  <Flex column padding={[2, 3]} border={{ side: "bottom", color: "border" }}>
    <Topbar extended mainChild={<H4>War Room</H4>}>
      {actions}
    </Topbar>
  </Flex>
)

export default {
  title: "Organisms/Topbar",
  component: Topbar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A page header row with a title slot on the left and actions on the right. Use it at the top of a page or panel.",
      },
    },
  },
  argTypes: {
    extended: {
      description: "Uses wider spacing between the actions.",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    mainChild: {
      description: "Content on the left, usually a heading.",
      control: false,
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
    },
    children: {
      description: "Actions on the right, usually buttons.",
      control: false,
      table: { type: { summary: "ReactNode" }, defaultValue: { summary: "undefined" } },
    },
  },
}
