import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'
import { ClipLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { selectTheme } from '../slices'

const HeroView = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 32rem;
  padding: 5% ${(props) => props.theme.layout.padding};
  flex-grow: 1;
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  text-align: ${(props) => props.textAlign};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-height: 18rem;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 2.5rem;
  }
`

const HeroBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.5s ease-in-out 0s forwards;
`

const HeroLoading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeroOverlay = styled('div')`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.color || 'rgba(0, 0, 0, 0.3)'};
`

const HeroChildren = styled('div')`
  position: relative;
  z-index: 2;
`

const makeOverlayColor = (color, opacity) => {
  if (!color || !opacity) return null
  const r = parseInt(color.slice(0, 2), 16)
  const g = parseInt(color.slice(2, 4), 16)
  const b = parseInt(color.slice(4, 6), 16)
  const o = parseFloat(opacity / 100.0).toFixed(2)
  return `rgba(${r}, ${g}, ${b}, ${o})`
}

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

const Hero = ({
  imageUrl,
  vertical = 'BOTTOM',
  horizontal = 'CENTER',
  show_overlay = false,
  title_color,
  overlay_color,
  overlay_opacity,
  style = {},
  children,
}) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle =
    imageUrl && !isLoading
      ? { ...style, backgroundImage: `url(${imageUrl}` }
      : null
  const theme = useSelector(selectTheme)
  const loaderColor = `#${title_color}` || theme.bgColors.primary
  const overlayColor = makeOverlayColor(overlay_color, overlay_opacity)
  const justifyContent = makeAlignment(horizontal)
  const alignItems = makeAlignment(vertical)
  return (
    <HeroView
      justifyContent={justifyContent}
      alignItems={alignItems}
      textAlign={horizontal}
    >
      {isLoading ? (
        <HeroLoading>
          <ClipLoader size={30} loading={true} color={loaderColor} />
        </HeroLoading>
      ) : (
        <HeroBackgroundImage style={bgStyle}>
          {show_overlay && <HeroOverlay color={overlayColor} />}
        </HeroBackgroundImage>
      )}
      <HeroChildren>{children}</HeroChildren>
    </HeroView>
  )
}

Hero.displayName = 'Hero'
Hero.propTypes = {
  imageUrl: propTypes.string,
  vertical: propTypes.string,
  horizontal: propTypes.string,
  show_overlay: propTypes.bool,
  title_color: propTypes.string,
  overlay_color: propTypes.string,
  overlay_opacity: propTypes.number,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Hero
