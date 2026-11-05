import React, { Fragment, useCallback, useState } from "react"
import styled from "styled-components"
import useToggle from "@/hooks/useToggle"
import { H5 } from "@/components/typography"
import { Icon } from "@/components/icon"
import { Button } from "@/components/button"
import Flex from "@/components/templates/flex"
import Layer from "@/components/templates/layer"
import { modalShadow } from "@/components/templates/layer/mixins/elevation"
import General from "./general"
import Dashboard from "./dashboard"
import SearchProvider, { SearchInput, SearchResults } from "./search"

const Container = styled(Flex).attrs({
  padding: [4],
  background: "dropdown",
  gap: 4,
  column: true,
  round: 2,
  border: { side: "all", color: "border" },
  overflow: { vertical: "auto" },
})`
  box-shadow: ${modalShadow};
`

const Header = ({ children, onClose }) => {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="between"
      padding={[0, 0, 3]}
      border={{ side: "bottom", color: "border" }}
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

const views = { general: "general", dashboard: "dashboard", search: "search" }
const titles = { general: "Need help?", dashboard: "Need help?" }

const Documentation = ({
  app = "cloud",
  onCloseClick,
  onVisitDocumentClick,
  onOpenIssueClick,
  onOpenBugClick,
  onContributeClick,
  onSupportClick,
  onGoToDemoClick,
  children,
  demoUrl,
  modalProps = {},
}) => {
  const [isOpen, toggle] = useToggle()
  const [view, setView] = useState(views.general)

  const isGeneral = view === views.general
  const setDashboardView = useCallback(() => setView(views.dashboard), [])
  const setGeneralView = useCallback(() => setView(views.general), [])
  const setSearchView = useCallback(() => setView(views.search), [])

  const closeClicked = useCallback(() => {
    toggle()
    if (onCloseClick) onCloseClick()
  }, [])

  return (
    <Fragment>
      {children(toggle, isOpen)}
      {isOpen && (
        <Layer
          position="bottom-left"
          backdrop
          margin={[5, 17]}
          onClickOutside={toggle}
          onEsc={toggle}
        >
          <SearchProvider>
            {({ searchTerm, setSearchTerm, results, reset }) => {
              return (
                <Fragment>
                  <Container
                    width={{
                      max: isGeneral ? "325px" : view === views.dashboard ? "600px" : "100%",
                    }}
                    data-testid="documentation-layer"
                    {...modalProps}
                  >
                    <Header onClose={closeClicked}>
                      {isGeneral && (
                        <Icon color="text" name="questionFilled" width="18px" height="18px" />
                      )}
                      {!isGeneral && (
                        <Button
                          icon="arrow_left"
                          neutral
                          small
                          onClick={() => {
                            setGeneralView()
                            reset()
                          }}
                          flavour="borderless"
                          data-testid="dashboard-back"
                        />
                      )}
                      <H5 margin={[0]}>{titles[view] || titles.general}</H5>
                    </Header>

                    {view !== views.dashboard && (
                      <SearchInput
                        value={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setSearchView={setSearchView}
                      />
                    )}
                    {isGeneral && (
                      <Flex gap={4} overflow={{ vertical: "auto" }} column padding={[1]}>
                        <General
                          app={app}
                          onDashboardClick={setDashboardView}
                          onVisitDocumentClick={onVisitDocumentClick}
                          onOpenIssueClick={onOpenIssueClick}
                          onOpenBugClick={onOpenBugClick}
                          onContributeClick={onContributeClick}
                          onSupportClick={onSupportClick}
                          onGoToDemoClick={onGoToDemoClick}
                          demoUrl={demoUrl}
                        />
                      </Flex>
                    )}
                    {view === views.dashboard && <Dashboard />}
                    {view === views.search && <SearchResults results={results} />}
                  </Container>
                </Fragment>
              )
            }}
          </SearchProvider>
        </Layer>
      )}
    </Fragment>
  )
}

export default Documentation
