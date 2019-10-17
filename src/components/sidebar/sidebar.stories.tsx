import React from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"

import { Sidebar } from "./sidebar"
import { PortalSidebar } from "./portaled-sidebar"
import { getColor } from "../../theme/utils"

const sidebarStory = storiesOf("Sidebar", module)

const subData = {
  jest: [],
}

sidebarStory.add("empty", () => <Sidebar />, subData)

sidebarStory.add("on right", () => <Sidebar right />, subData)

const StaticBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #fff;
`

const StaticContent = () => <StaticBox>This is simple static content</StaticBox>

sidebarStory.add("with static content", () => <Sidebar info={<StaticContent />} />, subData)

const SidebarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 100%;
  width: 100%;
  color: black;
`

sidebarStory.add(
  "with sidebar content",
  () => (
    <Sidebar>
      <SidebarContent>This is sidebar content</SidebarContent>
    </Sidebar>
  ),
  subData
)

sidebarStory.add(
  "portaled sidebar",
  () => (
    <PortalSidebar>
      <SidebarContent>This is sidebar content</SidebarContent>
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
  () => (
    <>
      <Underlay>Partialy hided content</Underlay>
      <PortalSidebar right>
        <SidebarContent>This is sidebar content</SidebarContent>
      </PortalSidebar>
    </>
  ),
  subData
)
