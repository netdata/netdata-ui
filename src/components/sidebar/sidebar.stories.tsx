import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"

import { text, boolean } from "@storybook/addon-knobs"
import { Sidebar } from "./sidebar"
import { PortalSidebar } from "./portaled-sidebar"
import { getColor } from "../../theme/utils"
import { readmeCleanup } from "../../../utils/readme"
// @ts-ignore
import readme from "./README.md"

const sidebarStory = storiesOf("Sidebar", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["portal.test.tsx", "portal-sidepan.test.tsx"],
}

sidebarStory.add("empty", () => <Sidebar right={boolean("right", false)} />, subData)

sidebarStory.add("on right", () => <Sidebar right={boolean("right", true)} />, subData)

const StaticBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #fff;
`

sidebarStory.add(
  "with static content",
  () => (
    <Sidebar
      right={boolean("right", false)}
      info={<StaticBox>{text("infobox children text", "this is infobox children text")}</StaticBox>}
    />
  ),
  subData
)

const SidebarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100%;
  width: 100%;
  color: #3a3a3a;
`

sidebarStory.add(
  "with sidebar content",
  () => (
    <Sidebar right={boolean("right", false)}>
      <SidebarContent>
        {text("sidebar children text", "this is sidebar children text")}
      </SidebarContent>
    </Sidebar>
  ),
  subData
)

sidebarStory.add(
  "portaled sidebar",
  () => (
    <PortalSidebar right={boolean("right", false)}>
      <SidebarContent>
        {text("sidebar children text", "this is sidebar children text")}
      </SidebarContent>
    </PortalSidebar>
  ),
  subData
)

const Underlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${getColor(["green", "greenHaze"])};
`

sidebarStory.add(
  "portal sidebar as overlay",
  () => {
    const [someText, setSomeText] = useState<string | null>("opened")
    const textHolder = " - text should disappear after you press `Esc`"
    return (
      <>
        <Underlay>
          {someText}
          {textHolder}
        </Underlay>
        {someText && (
          <PortalSidebar
            closeOnEsc
            onClose={() => {
              setSomeText(null)
            }}
            right={boolean("right", true)}
          >
            <SidebarContent>
              {text("sidebar children text", "this is sidebar children text")}
            </SidebarContent>
          </PortalSidebar>
        )}
      </>
    )
  },
  subData
)
