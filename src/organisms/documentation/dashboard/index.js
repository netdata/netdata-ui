import React from "react"
import styled from "styled-components"
import { Tabs, Tab } from "@/components/tabs"
import Flex from "@/components/templates/flex"
import Mouse from "./mouse"
import Touch from "./touch"

const StyledTabs = styled(Tabs)`
  width: 100%;

  .tabs > * {
    min-width: initial;
    max-width: initial;
  }
`

const Dashboard = () => (
  <Flex overflow={{ vertical: "auto" }} data-testid="dashboard">
    <StyledTabs>
      <Tab label="Using a Mouse">
        <Mouse />
      </Tab>
      <Tab label="Using Touch">
        <Touch />
      </Tab>
    </StyledTabs>
  </Flex>
)

export default Dashboard
