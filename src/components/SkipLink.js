import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SkipLinkView = styled('a')`
  position: absolute;
  z-index: 10000;
  top: 0;
  right: 100%;
  // right: auto;
  margin: 1rem 0 0 1rem;
  display: inline-block;
  line-height: 1;
  text-align: center;
  margin: 0;
  font-family: ${(props) => props.theme.buttons.sizes.default.family};
  font-weight: ${(props) => props.theme.buttons.sizes.default.weight};
  -webkit-font-smoothing: ${(props) =>
    props.theme.buttons.sizes.default.fontSmoothing};
  letter-spacing: ${(props) => props.theme.buttons.sizes.default.letterSpacing};
  text-transform: ${(props) => props.theme.buttons.sizes.default.textTransform};
  font-size: ${(props) => props.theme.buttons.sizes.default.fontSize};
  padding: ${(props) => props.theme.buttons.sizes.default.padding};
  border-style: solid;
  border-width: ${(props) => props.theme.buttons.sizes.default.borderWidth};
  border-radius: ${(props) => props.theme.buttons.sizes.default.borderRadius};
  color: ${(props) => props.theme.buttons.colors.primary.color};
  background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
  border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};

  &:focus {
    right: auto;
    color: ${(props) => props.theme.buttons.colors.primary.color};
    background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
    border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};
  }
`

const SkipLink = ({ id = 'main' }) => {
  const mainId = id.includes('#') ? id : `#${id}`
  return <SkipLinkView href={mainId}>Skip to Main Content</SkipLinkView>
}

SkipLink.displayName = 'SkipLink'
SkipLink.propTypes = {
  id: propTypes.string,
}

export default SkipLink
