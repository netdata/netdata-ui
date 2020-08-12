import styled from "styled-components"
import { controlFocused } from "../../mixins"
import { getColor, getSizeBy, getSizeUnit } from "../../theme/utils"

export const Container = styled.div`
  width: 100%;
`

export const FilterContainer = styled.div`
  width: 100%;
  height: ${getSizeBy(5)};
  .react-filter-box {
    height: 38px;
    padding: 4px 6px;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 20px;
    border-radius: 4px;
    border: 1px solid #35414a;
    box-shadow: none;
  }

  .react-filter-box.error {
    border-color: ${getColor(["error"])};
    box-shadow: none;
  }

  .react-filter-box.focus {
    box-shadow: none;
    ${controlFocused}
  }

  .react-filter-box.error.focus {
    border-color: ${getColor(["error"])};
    box-shadow: 0 0 0 1px ${getColor(["error"])};
  }
`

export const MetaContainer = styled.div`
  height: 40px;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`
