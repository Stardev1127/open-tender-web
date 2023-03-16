import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'
import { ClipLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { selectTheme } from '../slices'

const HeroSiteView = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 64rem;
  background-color: ${(props) => props.theme.bgColors.dark};
`

const HeroSiteBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  animation: fade-in 0.5s ease-in-out 0s forwards;
`

const HeroSiteLoading = styled.div`
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

const HeroSiteContent = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: ${(props) => props.theme.layout.margin}
    ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.marginMobile}
      ${(props) => props.theme.layout.paddingMobile};
  }
`

const HeroSite = ({ imageUrl, style = {}, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle =
    imageUrl && !isLoading
      ? { ...style, backgroundImage: `url(${imageUrl}` }
      : null
  const theme = useSelector(selectTheme)
  return (
    <HeroSiteView>
      {isLoading ? (
        <HeroSiteLoading>
          <ClipLoader size={30} loading={true} color={theme.bgColors.light} />
        </HeroSiteLoading>
      ) : (
        <HeroSiteBackgroundImage style={bgStyle} />
      )}
      <HeroSiteContent>{children}</HeroSiteContent>
    </HeroSiteView>
  )
}

HeroSite.displayName = 'HeroSite'
HeroSite.propTypes = {
  imageUrl: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default HeroSite
