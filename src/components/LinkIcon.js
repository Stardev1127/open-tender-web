import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const LinkIconView = styled('span')`
  display: inline-block;
  margin: ${(props) => (props.isBefore ? '0 1.5rem 0 0' : '0 0 0 1.5rem')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 auto;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    flex-direction: ${(props) => (props.isBefore ? 'row-reverse' : 'row')};
  }

  span {
    display: block;
  }
`

const LinkIconIcon = styled('span')`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  margin: 0 0.5rem;
`

const LinkIcon = ({ to, text, icon, size = '1.6rem', isBefore = false }) => {
  return (
    <LinkIconView isBefore={isBefore}>
      <Link to={to}>
        <span>{text}</span>
        <LinkIconIcon size={size}>{icon}</LinkIconIcon>
      </Link>
    </LinkIconView>
  )
}

LinkIcon.displayName = 'LinkIcon'
LinkIcon.propTypes = {
  to: propTypes.string,
  text: propTypes.string,
  icon: propTypes.element,
}

export default LinkIcon
