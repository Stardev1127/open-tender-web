import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { BgImage, useImage } from '@open-tender/components'
import { ImageSpinner } from '../..'

const MenuItemImageView = styled.div`
  position: relative;
  z-index: 1;
  padding: 33.33333% 0;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 33.33333% 0;
  }
`

const MenuItemImageLoading = styled.div`
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

const MenuItemBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const MenuItemImage = ({ imageUrl, children }) => {
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError

  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return (
    <MenuItemImageView>
      {bgStyle && isLoading && (
        <MenuItemImageLoading>
          <ImageSpinner size={isBrowser ? 24 : 16} />
        </MenuItemImageLoading>
      )}
      {hasLoaded && (
        <MenuItemBackgroundImage style={bgStyle}>
          &nbsp;
        </MenuItemBackgroundImage>
      )}
      {children}
    </MenuItemImageView>
  )
}

MenuItemImage.displayName = 'MenuItemImage'
MenuItemImage.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default MenuItemImage
