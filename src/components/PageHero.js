import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'
import { makeSlides } from '@open-tender/js'
import { BackgroundImage, BackgroundLoading, Slider } from '.'

const PageHeroView = styled.div`
  label: PageHero;
  flex-grow: 1;
  display: flex;
  min-height: 64rem;
  height: 100vh;
  ${(props) =>
    props.isMobile ? `height: 100%; height: -webkit-fill-available;` : ''}
  ${(props) =>
    props.ht ? `height: ${props.ht}; min-height: ${props.ht};` : ''}
`

const PageHero = ({ announcements, imageUrl, height, style, children }) => {
  const theme = useTheme()
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities, isMobile)
  const isLoading = loading === 'pending'
  const hideHero = !slides && !imageUrl

  if (hideHero) return null

  return (
    <PageHeroView ht={height} isMobile={isMobile} style={style}>
      {isLoading ? (
        <BackgroundLoading />
      ) : slides ? (
        <Slider
          settings={settings}
          slides={slides}
          bgColor={theme.bgColors.dark}
        />
      ) : imageUrl ? (
        <BackgroundImage imageUrl={imageUrl} bgColor={theme.bgColors.dark}>
          {children}
        </BackgroundImage>
      ) : null}
    </PageHeroView>
  )
}

PageHero.displayName = 'PageHero'
PageHero.propTypes = {
  announcements: propTypes.object,
  imageUrl: propTypes.string,
  height: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageHero
