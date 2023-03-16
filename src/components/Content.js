import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { SkipLink, Footer } from '.'

import { maybeRefreshVersion } from '../app/version'

const ContentView = styled('div')`
  label: Content;

  width: 100%;
  height: 100%;
  max-width: ${(props) => props.maxWidth};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

const Content = ({
  maxWidth = '100%',
  scrollTop = true,
  hasRouter = true,
  hasFooter = true,
  children,
  style = null,
}) => {
  useEffect(() => {
    if (scrollTop) window.scrollTo(0, 0)
    maybeRefreshVersion()
  }, [scrollTop])

  return (
    <ContentView maxWidth={maxWidth} style={style}>
      <>
        <SkipLink />
        {children}
        {hasFooter && <Footer hasRouter={hasRouter} />}
      </>
    </ContentView>
  )
}

Content.displayName = 'Content'
Content.propTypes = {
  maxWidth: propTypes.string,
  scrollTop: propTypes.bool,
  hasRouter: propTypes.bool,
  hasFooter: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Content
