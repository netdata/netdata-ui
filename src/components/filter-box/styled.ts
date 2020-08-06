import styled from "styled-components"
import { getColor, getSizeBy } from "../../theme/utils"

export const Container = styled.div`
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
`
