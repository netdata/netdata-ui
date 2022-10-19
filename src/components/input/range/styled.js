import styled from "styled-components"

export const InputRange = styled.input.attrs({ type: "range" })`
  -webkit-appearance: none;
  height: 2px;
  background: #00ab4440;
  background-image: linear-gradient(#00ab44, #00ab44);
  background-repeat: no-repeat;
  cursor: pointer;
  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background: #00ab44;
    transition: all 0.3s ease-in-out;

    &:active {
      height: 16px;
      width: 16px;
    }
  }
`
