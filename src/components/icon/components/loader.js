import React from "react"
import styled from "styled-components"
import { getColor } from "@/theme"

const StyledSvg = styled.svg`
  fill: none;
  stroke-width: 17px;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: ntd-draw 1s linear infinite;
  stroke: ${getColor("bright")};
  width: 24px;
  .path {
    stroke: ${getColor("bright")};
  }

  @keyframes ntd-draw {
    to {
      stroke-dashoffset: 0;
    }
  }
`

export const LoaderIcon = ({ className }) => (
  <StyledSvg
    className={className}
    viewBox="0 0 21 17"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="path" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <path
        d="M2,1 C8.25086152,1 11.9367136,1 13.0575562,1 C14.73882,1 19.6834591,2 19.9614325,7.72050108 C20.239406,13.4410022 15.7459591,15.1224845 13.6463763,15.1224845 C12.2466545,15.1224845 10.0279195,15.1224845 6.9901715,15.1224845 L2,1 Z"
        id="Path-2"
        strokeWidth="2"
      />
    </g>
  </StyledSvg>
)
