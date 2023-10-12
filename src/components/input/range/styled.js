import styled from "styled-components"
import { getColor } from "@/theme"

export const InputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  height: 2px;
  background-color: ${getColor("primary")}40;
  background-image: linear-gradient(${getColor("primary")}, ${getColor("primary")});
  background-repeat: no-repeat;
  background-size: ${({ max, value }) => `${(value * 100) / max}% 100%`};
  cursor: pointer;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: ${getColor("primary")};
    transition: all 0.3s ease-in-out;

    &:active {
      height: 16px;
      width: 16px;
    }
  }
`
