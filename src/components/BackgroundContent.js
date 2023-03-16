import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Headline } from '@open-tender/components'

import { Container } from '.'
import BackgroundCta from './BackgroundCta'

const BackgroundContentView = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: ${(props) => props.theme.layout.padding};
  padding-top: ${(props) =>
    props.paddingVertical || props.theme.layout.headerHeightSite};
  padding-bottom: ${(props) =>
    props.paddingVertical || props.theme.layout.headerHeightSite};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-top: ${(props) =>
      props.paddingVertical || props.theme.layout.headerHeightSiteMobile};
    padding-bottom: ${(props) =>
      props.paddingVertical || props.theme.layout.headerHeightSiteMobile};
    justify-content: ${(props) => props.justifyContent};
    align-items: ${(props) => props.alignItems};
    text-align: center;
  }
`

const BackgroundContentText = styled.div`
  max-width: 96rem;
  // padding: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    // padding: ${(props) => props.theme.layout.paddingMobile} 0;
  }
`

const BackgroundContentTitle = styled(Headline)`
  color: #${(props) => props.textColor};
  font-size: ${(props) => props.fontSize || props.theme.fonts.sizes.mega};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
  }
`

const BackgroundContentSubtitle = styled.p`
  margin: 0.5em 0;
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
  color: #${(props) => props.textColor};
  font-size: ${(props) => props.fontSize || props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const makeAlignment = (alignment) => {
  switch (alignment) {
    case 'TOP':
    case 'LEFT':
      return 'flex-start'
    case 'BOTTOM':
    case 'RIGHT':
      return 'flex-end'
    default:
      return 'center'
  }
}

const BackgroundContent = ({
  title,
  subtitle,
  url,
  url_text,
  title_color = 'ffffff',
  subtitle_color = 'ffffff',
  title_size = null,
  subtitle_size = null,
  vertical = 'BOTTOM',
  horizontal = 'CENTER',
  hide_text = false,
  paddingVertical,
  children,
}) => {
  if (!title && !subtitle) return null
  const justifyContent = makeAlignment(horizontal)
  const alignItems = makeAlignment(vertical)
  const titleSize = title_size ? `${(title_size / 10).toFixed(1)}rem` : null
  const subtitleSize = subtitle_size
    ? `${(subtitle_size / 10).toFixed(1)}rem`
    : null

  if (hide_text) return null

  return (
    <BackgroundContentView
      justifyContent={justifyContent}
      alignItems={alignItems}
      textAlign={horizontal}
      paddingVertical={paddingVertical}
    >
      <Container>
        <BackgroundContentText>
          {title && (
            <BackgroundContentTitle
              as="p"
              textColor={title_color.replace('#', '')}
              fontSize={titleSize}
            >
              {title}
            </BackgroundContentTitle>
          )}
          {subtitle && (
            <BackgroundContentSubtitle
              textColor={subtitle_color.replace('#', '')}
              fontSize={subtitleSize}
            >
              {subtitle}
            </BackgroundContentSubtitle>
          )}
          <BackgroundCta url={url} urlText={url_text}>
            {children}
          </BackgroundCta>
        </BackgroundContentText>
      </Container>
    </BackgroundContentView>
  )
}

BackgroundContent.displayName = 'BackgroundContent'
BackgroundContent.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  title_color: propTypes.string,
  subtitle_color: propTypes.string,
  title_size: propTypes.number,
  subtitle_size: propTypes.number,
  vertical: propTypes.string,
  horizontal: propTypes.string,
  hide_text: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default BackgroundContent
