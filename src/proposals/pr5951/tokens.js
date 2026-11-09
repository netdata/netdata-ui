// Faithful copy of cloud-frontend PR 5951 (src/domains/configuration/styles/*). Raw hex/px values are
// kept on purpose so the review shows the PR as written; they are not netdata-ui conventions.
import styled, { css, createGlobalStyle } from "styled-components"
import Box from "@/components/templates/box"
import { getColor, getSizeBy } from "@/theme"

export const monoFont = `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`

export const focusRingAt = (offset, radius) => css`
  &:focus-visible {
    outline: 2px solid var(--dyncfg-focus);
    outline-offset: ${offset}px;
    ${radius ? `border-radius: ${radius};` : ""}
  }
`

export const focusRing = focusRingAt(-2)

export const dot = ({ size = 6, color = "currentColor", hollow = false } = {}) => css`
  box-sizing: border-box;
  width: ${getSizeBy(size / 8)};
  height: ${getSizeBy(size / 8)};
  border-radius: 50%;
  ${hollow ? `border: 1.5px solid ${color};` : `background: ${color};`}
`

export const checkMarkPath = "polygon(14% 44%, 0 59%, 40% 100%, 100% 22%, 86% 8%, 39% 70%)"

export const hitArea = css`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: max(100%, ${getSizeBy(3)});
    height: max(100%, ${getSizeBy(3)});
    transform: translate(-50%, -50%);
  }
`

export const VisuallyHidden = styled(Box).attrs(({ as = "span" }) => ({ as }))`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`

export const eyebrow = css`
  font-size: 11px;
  line-height: 16px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--dyncfg-text-secondary);
`

// Subset of the PR's --dyncfg-* variables that the ported elements read (dyncfgStyles.js:39-213).
const darkVars = css`
  --dyncfg-text-primary: #e2e8e8;
  --dyncfg-text-secondary: #8fa3a3;
  --dyncfg-text-placeholder: #7a8e8e;
  --dyncfg-control-border: #748888;
  --dyncfg-success-text: #1fc463;
  --dyncfg-error-text: #ff6b7a;
  --dyncfg-warning-text: #f5b638;
  --dyncfg-warning-level-text: #1f1300;
  --dyncfg-critical-level-text: #ffdfe3;
  --dyncfg-clear-pill-bg: #2e3737;
  --dyncfg-clear-pill-text: #c9d3d3;
  --dyncfg-row-hover: #262f2f;
  --dyncfg-row-selected: #283333;
  --dyncfg-check-fill: #dfe6e6;
  --dyncfg-check-mark: #172020;
  --dyncfg-info-text: #7ab8f5;
  --dyncfg-chip-border: #445252;
  --dyncfg-segment-bg: rgba(255, 255, 255, 0.04);
  --dyncfg-segment-active: rgba(255, 255, 255, 0.11);
  --dyncfg-segment-shadow: none;
  --dyncfg-match-bg: rgba(232, 237, 237, 0.2);
  --dyncfg-paper: #202626;
  --dyncfg-paper-edge: #2e3737;
  --dyncfg-heading: #93c9cb;
  --dyncfg-backdrop: rgba(0, 0, 0, 0.5);
  --dyncfg-dialog-border: rgba(255, 255, 255, 0.08);
  --dyncfg-dialog-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);
  --dyncfg-danger-fill: #ff6b7a;
  --dyncfg-danger-label: #172020;
  --dyncfg-focus: #00cd51;
  --dyncfg-primary-fill: #00ab44;
  --dyncfg-primary-label: #0c0f0f;
  --dyncfg-disabled-border: #2e3737;
  --dyncfg-disabled-text: #627474;
  --dyncfg-disabled-fill: #2b3232;
  --dyncfg-disabled-fill-text: #7a8e8e;
  --dyncfg-pill-tint: 13%;
  --dyncfg-logo-tile: #c0caca;
  --dyncfg-letter-tile: #1f2525;
  --dyncfg-letter-tile-edge: #445252;
  --dyncfg-letter-tile-text: #8fa3a3;
  --dyncfg-popover-bg: #232929;
  --dyncfg-popover-border: #2e3737;
  --dyncfg-popover-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
`

const lightVars = css`
  --dyncfg-text-primary: #1f2b2b;
  --dyncfg-text-secondary: #566868;
  --dyncfg-text-placeholder: #687a7a;
  --dyncfg-control-border: #7f9090;
  --dyncfg-success-text: #007a31;
  --dyncfg-error-text: #c4122a;
  --dyncfg-warning-text: #905d00;
  --dyncfg-warning-level-text: #5a3500;
  --dyncfg-critical-level-text: #4d0610;
  --dyncfg-clear-pill-bg: #e6ebeb;
  --dyncfg-clear-pill-text: #3f4d4d;
  --dyncfg-row-hover: #f0f4f4;
  --dyncfg-row-selected: #dce5e6;
  --dyncfg-check-fill: #1f2a2a;
  --dyncfg-check-mark: #ffffff;
  --dyncfg-info-text: #2366b8;
  --dyncfg-chip-border: #cfd8d8;
  --dyncfg-segment-bg: #eef2f2;
  --dyncfg-segment-active: #ffffff;
  --dyncfg-segment-shadow: 0 0 0 1px #b7c3c3, 0 1px 2px rgba(23, 32, 32, 0.14);
  --dyncfg-match-bg: rgba(23, 32, 32, 0.12);
  --dyncfg-paper: #ffffff;
  --dyncfg-paper-edge: #dde4e4;
  --dyncfg-heading: #1d6470;
  --dyncfg-backdrop: rgba(15, 24, 24, 0.28);
  --dyncfg-dialog-border: rgba(23, 32, 32, 0.08);
  --dyncfg-dialog-shadow: 0 16px 48px rgba(23, 32, 32, 0.2);
  --dyncfg-danger-fill: #c4122a;
  --dyncfg-danger-label: #ffffff;
  --dyncfg-focus: #007830;
  --dyncfg-primary-fill: #007830;
  --dyncfg-primary-label: #ffffff;
  --dyncfg-disabled-border: #cfd8d8;
  --dyncfg-disabled-text: #8b9b9b;
  --dyncfg-disabled-fill: #d3dbdb;
  --dyncfg-disabled-fill-text: #6b7c7c;
  --dyncfg-pill-tint: 8%;
  --dyncfg-logo-tile: #f4f6f6;
  --dyncfg-letter-tile: #f4f6f6;
  --dyncfg-letter-tile-edge: #d2d9d9;
  --dyncfg-letter-tile-text: #465252;
  --dyncfg-popover-bg: #ffffff;
  --dyncfg-popover-border: #dbe1e1;
  --dyncfg-popover-shadow: 0 8px 24px rgba(23, 32, 32, 0.12);
`

// Mounted only while a PR 5951 story renders, so the variables never leak into other stories.
export const DyncfgVars = createGlobalStyle`
  :root {
    ${({ theme }) => (theme?.name === "Default" ? lightVars : darkVars)}
    --dyncfg-radius-xs: ${getSizeBy(0.5)};
    --dyncfg-radius-sm: ${getSizeBy(0.75)};
    --dyncfg-radius-md: ${getSizeBy(1)};
    --dyncfg-radius-lg: ${getSizeBy(1.5)};
    --dyncfg-radius-pill: 999px;
    --dyncfg-input-bg: ${getColor("mainBackground")};
  }

  .dyncfg-popover.dyncfg-popover {
    background: var(--dyncfg-popover-bg);
    border: 1px solid var(--dyncfg-popover-border);
    border-radius: var(--dyncfg-radius-md);
    box-shadow: var(--dyncfg-popover-shadow);
  }
`
