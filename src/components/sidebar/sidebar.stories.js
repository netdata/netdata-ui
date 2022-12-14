import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { text, boolean } from "@storybook/addon-knobs"
import { action } from "@storybook/addon-actions"
import { Sidebar } from "./sidebar"
import { PortalSidebar } from "./portaled-sidebar"
import { getColor } from "src/theme/utils"
import { readmeCleanup } from "utils/readme"
import { Button } from "src/components/button"
import readme from "./README.md"

const sidebarStory = storiesOf("Templates/Sidebar", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["sidebar.test.tsx", "portal-sidebar.test.tsx"],
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
  flex-direction: column;
  overflow: scroll;
  align-items: center;
  justify-content: first baseline;
  background-color: rgba(255, 255, 255, 0);
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
const Header = styled.div`
  width: 100%;
  background-color: ${getColor("separator")};
`

const StyledPortalSidebar = styled(PortalSidebar)`
  width: 50%;
  max-width: 300px;
`

sidebarStory.add(
  "styled portaled with large list",
  () => {
    const list: number[] = []
    for (let i = 0; i <= 100; i += 1) {
      list.push(i)
    }
    return (
      <StyledPortalSidebar right={boolean("right", false)}>
        <Header>I am header</Header>
        <SidebarContent>
          {list.map(e => (
            <div key={e}>{e}</div>
          ))}
        </SidebarContent>
      </StyledPortalSidebar>
    )
  },
  subData
)

const Underlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${getColor("primary")};
  height: 100vh;
  width: 100vw;
`

sidebarStory.add(
  "portal sidebar as overlay",
  () => {
    const [someText, setSomeText] = useState("opened")
    const textHolder = " - text should disappear after you press `Esc`"
    return (
      <>
        <Underlay>
          <Button danger label="Click me 1" onClick={action("clicked1")} />
          {someText}
          {textHolder}
          <Button
            danger
            label="Open!"
            onClick={() => {
              setSomeText("Opened")
            }}
          />
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
              <Button
                label="Close"
                onClick={() => {
                  setSomeText(null)
                }}
              />
            </SidebarContent>
          </PortalSidebar>
        )}
      </>
    )
  },
  subData
)
