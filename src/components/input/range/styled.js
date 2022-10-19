import styled from "styled-components"

export const InputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  height: 2px;
  background: rgba(1, 135, 134, 0.26);
  background-image: linear-gradient(#018786, #018786);
  background-repeat: no-repeat;
  cursor: pointer;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #018786;
    transition: all 0.3s ease-in-out;

    &:active {
      height: 16px;
      width: 16px;
    }
  }
`
