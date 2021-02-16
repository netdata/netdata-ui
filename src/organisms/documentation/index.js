import React, { useState, useCallback } from "react"
import styled from "styled-components"
import { useToggle } from "react-use"
import { H5 } from "src/components/typography"
import { Icon } from "src/components/icon"
import { Button } from "src/components/button"
import Flex from "src/components/templates/flex"
import Layer from "src/components/templates/layer"
import General from "./general"
import Dashboard from "./dashboard"

const Container = styled(Flex).attrs({
  padding: [6],
  background: "mainBackground",
  gap: 6,
  column: true,
  round: true,
  overflow: { vertical: "auto" },
})`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Header = ({ children, onClose }) => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="between"
      padding={[0, 0, 4]}
      border={{ side: "bottom", color: "disabled" }}
    >
      <Flex gap={2} alignItems="center">
        {children}
      </Flex>
      <Button
        icon="x"
        neutral
        small
        onClick={onClose}
        flavour="borderless"
        data-testid="documentation-help-close"
      />
    </Flex>
  )
}

const views = { general: "general", dashboard: "dashboard" }
const titles = { general: "Netdata Help", dashboard: "Dashboard Help" }

const Documentation = ({
  app = "cloud",
  onClickOut,
  onCloseClick,
  onVisitDocumentClick,
  onOpenIssueClick,
  onOpenBugClick,
  onContributeClick,
  onSupportClick,
  children,
}) => {
  const [isOpen, toggle] = useToggle()
  const [view, setView] = useState(views.general)

  const isGeneral = view === views.general
  const setDashboardView = useCallback(() => setView(views.dashboard), [])
  const setGeneralView = useCallback(() => setView(views.general), [])

  const closeClicked = useCallback(() => {
    toggle()
    if (onCloseClick) onCloseClick()
  }, [])

  const clickedOut = useCallback(() => {
    toggle()
    if (onClickOut) onClickOut()
  }, [])

  return (
    <>
      {children(toggle, isOpen)}
      {isOpen && (
        <Layer
          position="bottom-left"
          backdrop
          margin={[5, 17]}
          onClickOutside={toggle}
          onEsc={toggle}
        >
          <Container
            width={{ max: isGeneral ? "325px" : "600px" }}
            data-testid="documentation-layer"
          >
            <Header onClose={closeClicked}>
              {isGeneral && <Icon color="text" name="questionFilled" width="18px" height="18px" />}
              {!isGeneral && (
                <Button
                  icon="arrow_left"
                  neutral
                  small
                  onClick={setGeneralView}
                  flavour="borderless"
                  data-testid="dashboard-back"
                />
              )}
              <H5 margin={[0]}>{titles[view]}</H5>
            </Header>
            {isGeneral && (
              <Flex gap={6} overflow={{ vertical: "auto" }} column>
                <General
                  app={app}
                  onDashboardClick={setDashboardView}
                  onVisitDocumentClick={onVisitDocumentClick}
                  onOpenIssueClick={onOpenIssueClick}
                  onOpenBugClick={onOpenBugClick}
                  onContributeClick={onContributeClick}
                  onSupportClick={onSupportClick}
                />
              </Flex>
            )}
            {!isGeneral && <Dashboard />}
          </Container>
        </Layer>
      )}
    </>
  )
}

export default Documentation
