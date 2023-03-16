import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { makeSlides } from '@open-tender/js'
import { BackgroundImage, BackgroundLoading, Slider } from '.'

const BackgroundView = styled.div`
  position: fixed;
  z-index: ${(props) => (props.isSlides ? '1' : '-1')};
  top: 0;
  bottom: 0;
  left: 0;
  right: 76.8rem;
  display: flex;
`

const Background = ({ imageUrl, announcements, children, style }) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities, isMobile)
  const isLoading = loading === 'pending'
  const hideHero = !slides && !imageUrl

  if (isMobile || hideHero) return null

  return (
    <BackgroundView isSlides={!!slides} style={style}>
      {isLoading ? (
        <BackgroundLoading />
      ) : slides ? (
        <Slider settings={settings} slides={slides} />
      ) : imageUrl ? (
        <BackgroundImage imageUrl={imageUrl}>{children}</BackgroundImage>
      ) : null}
    </BackgroundView>
  )
}

Background.displayName = 'Background'
Background.propTypes = {
  imageUrl: propTypes.string,
  announcements: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default Background
