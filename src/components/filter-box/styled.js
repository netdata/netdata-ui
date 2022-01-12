import styled from "styled-components"
import { getColor, getValidatedControlColor } from "src/theme/utils"
import { MetaInfo } from "src/components/input/styled"
import { Text } from "src/components/typography"
import Flex from "src/components/templates/flex"

export const Container = styled.div`
  width: 100%;
  height: ${({ inline }) => (inline ? "40px" : "unset")};
  position: relative;
`

export const PlaceholderContainer = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 5px;
  right: 0;
  bottom: 0;
  padding-left: 6px;
`

export const PlaceholderText = styled(Text)`
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1;
  color: ${getColor("main")};
`

export const FilterContainer = styled(Flex)`
  position: relative;
  .react-filter-box {
    height: 100%;
    position: absolute;
    top: 0;
    left: 5px;
    right: 0;
    bottom: 0;
    background: transparent;
    pointer-events: auto;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: none;
    border: 0px solid ${getColor("selected")};
  }
  .react-filter-box.error.focus {
    border-color: transparent;
    box-shadow: 0 0 0 0px ${getValidatedControlColor("controlFocused")};
  }
  .react-codemirror2 {
    height: 100%;
    .CodeMirror {
      height: 100%;
    }
  }
`

export const MetaContainer = styled.div`
  ${({ inline }) =>
    inline &&
    `
  position: absolute;
  left: 0;
`}
  height: ${({ metaDisplay }) => (metaDisplay === "normal" ? "40px" : "20px")};
  width: 100%;
  max-width: 100%;
  display: ${({ metaDisplay }) => (metaDisplay === "none" ? "none" : "flex")};
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

export const ResultsCount = styled(MetaInfo)`
  color: ${getColor(["text"])};
  margin-left: auto;
  overflow: visible;
`

export const FilterInfo = styled(MetaInfo)`
  color: ${getValidatedControlColor()};
  flex-shrink: 1;
`
