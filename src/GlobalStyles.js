import React from 'react'
import { css, Global, withTheme } from '@emotion/react'

// https://stackoverflow.com/questions/51637950/enable-global-theming-with-emotion

const makeGlobalStyles = (theme) => css`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: sans-serif;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body.has-modal {
    overflow: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul,
  legend {
    margin: 0;
    padding: 0;

    @media (max-width: ${theme.breakpoints.tablet}) {
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
  }

  fieldset {
    padding: 0;
    border: 0;
    margin: 0;
  }

  label {
    position: relative;
  }

  input,
  textarea,
  select {
    -webkit-appearance: none;
  }

  input[type='search'] {
    -webkit-appearance: none;

    &::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      display: none;
    }
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='submit'] {
    width: auto;
    cursor: pointer;
  }

  ol,
  ul {
    list-style: none;
  }

  ol {
    list-style: decimal outside;
    padding: 0 0 0 1.5rem;

    li {
      margin: 1em 0 0;

      span {
        position: relative;
        left: 0rem;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    tr {
      border-bottom-width: 0.1rem;
      border-bottom-style: solid;
      border-bottom-color: ${theme.border.color};
    }

    th,
    td {
      text-align: center;
      padding: 1rem 0;

      &:first-of-type {
        text-align: left;
      }

      &:last-child {
        text-align: right;
      }
    }

    thead th {
      font-weight: normal;
      color: ${theme.colors.primary};
    }

    tbody tr:last-child {
      border-bottom: 0;
    }
  }

  a,
  button {
    &:active {
      outline: none;
    }
  }

  button {
    cursor: pointer;
    appearance: none;
    background: transparent;
    border: none;
    padding: 0;
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    transition: ${theme.links.transition};
    font-size: ${theme.fonts.sizes.main};
    color: ${theme.fonts.body.color};
  }

  button:disabled {
    cursor: default;
    opacity: 0.5;
  }

  button > * {
    pointer-events: none;
  }

  body {
    font-family: ${theme.fonts.body.family};
    font-weight: ${theme.fonts.body.weight};
    letter-spacing: ${theme.fonts.body.letterSpacing};
    text-transform: ${theme.fonts.body.textTransform};
    -webkit-font-smoothing: ${theme.fonts.body.fontSmoothing};
    color: ${theme.fonts.body.color};
    font-size: ${theme.fonts.sizes.main};
    background-color: ${theme.bgColors.primary};
  }

  header {
    background-color: ${theme.header.primary};
    &.stuck {
      background-color: ${theme.header.stuck};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${theme.fonts.headings.family};
    font-weight: ${theme.fonts.headings.weight};
    letter-spacing: ${theme.fonts.headings.letterSpacing};
    text-transform: ${theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${theme.fonts.headings.fontSmoothing};
    color: ${theme.fonts.headings.color};
  }

  h1 {
    font-size: ${theme.fonts.sizes.h1};
  }

  h2 {
    font-size: ${theme.fonts.sizes.h2};
  }

  h3 {
    font-size: ${theme.fonts.sizes.h3};
  }

  h4 {
    font-size: ${theme.fonts.sizes.h4};
  }

  h5 {
    font-size: ${theme.fonts.sizes.h5};
  }

  h6 {
    font-size: ${theme.fonts.sizes.h6};
  }

  a {
    cursor: pointer;
    transition: ${theme.links.transition};
    color: ${theme.links.primary.color};
    &:hover,
    &:active,
    &:focus {
      color: ${theme.links.primary.hover};
    }
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fill-bar {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }

  @keyframes fill-bar-vertical {
    0% {
      height: 0%;
    }
    100% {
      height: 100%;
    }
  }

  .md-enter,
  .md-exit.md-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;

    > div {
      transition: all 250ms ease;
      transform: translateY(10%);
    }
  }

  .md-enter.md-enter-active,
  .md-exit {
    opacity: 1;
    visibility: visible;

    > div {
      transform: translateY(0);
    }
  }

  .sidebar-enter,
  .sidebar-exit.sidebar-exit-active {
    transition: all 250ms ease;
    // transition: all 400ms cubic-bezier(0.17, 0.67, 0.12, 1);
    opacity: 0;
    visibility: hidden;
    transform: translateX(100%);
  }

  .sidebar-enter.sidebar-enter-active,
  .sidebar-exit {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  .tray-enter,
  .tray-exit.tray-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(100%);
  }

  .tray-enter.tray-enter-active,
  .tray-exit {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }

  .overlay-enter,
  .overlay-exit.overlay-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
  }

  .overlay-enter.overlay-enter-active,
  .overlay-exit {
    opacity: 1;
    visibility: visible;
  }

  .flash-enter {
    opacity: 0;
    transform: translateY(20%);
  }

  .flash-enter-active,
  .flash-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-exit-active {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter {
    opacity: 0;
    transform: translateY(-20%);
  }

  .flash-message-enter-active,
  .flash-message-exit {
    opacity: 1;
    transform: translateY(0);
  }

  .flash-message-exit-active {
    opacity: 0;
    transform: translateY(20%);
  }

  .reveal-enter,
  .reveal-exit.reveal-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
  }

  .reveal-enter.reveal-enter-active,
  .reveal-exit {
    opacity: 1;
    visibility: visible;
    max-height: 1000px;
  }

  .slide-toggle-down-enter,
  .slide-toggle-down-exit.slide-toggle-down-exit-active {
    transition: all 250ms ease;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10%);
  }

  .slide-toggle-down-enter.slide-toggle-down-enter-active,
  .slide-toggle-down-exit {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default GlobalStyles
