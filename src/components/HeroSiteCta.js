import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

const HeroSiteCtaView = styled.div`
  position: relative;
  z-index: 2;
  max-width: ${(props) => props.width || '72rem'};

  h1 {
    margin: 0 0 -0.6rem -0.3rem;
    line-height: 1;
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.mega};
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h1};
    }
  }

  p {
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    margin: 1em 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const HeroSiteCtaButton = styled.div`
  margin: 2rem 0 0;

  button {
    color: ${(props) => props.theme.colors.light};
    border-color: ${(props) => props.theme.colors.light};
    background: transparent;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const HeroSiteCta = ({ title, subtitle, children, style, width = '72rem' }) => {
  return (
    <HeroSiteCtaView width={width} style={style}>
      <Heading as="h1">{title}</Heading>
      <p>{subtitle}</p>
      {children && <HeroSiteCtaButton>{children}</HeroSiteCtaButton>}
    </HeroSiteCtaView>
  )
}

HeroSiteCta.displayName = 'HeroSiteCta'
HeroSiteCta.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  width: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default HeroSiteCta
