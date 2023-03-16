import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage, useImage } from '@open-tender/components'
import { ClipLoader } from 'react-spinners'
import { useTheme } from '@emotion/react'

const MenuItemImageView = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: ${(props) => props.theme.item.desktop.imageHeight};
  min-height: ${(props) => props.theme.item.desktop.imageMinHeight};
  max-height: ${(props) => props.theme.item.desktop.imageMaxHeight};
  padding: 0 ${(props) => props.theme.item.desktop.imagePadding};
  margin-top: ${(props) =>
    props.hidePadding ? '0' : props.theme.item.desktop.imagePadding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.item.mobile.imageHeight};
    min-height: ${(props) => props.theme.item.mobile.imageMinHeight};
    max-height: ${(props) => props.theme.item.mobile.imageMaxHeight};
    padding: 0 ${(props) => props.theme.item.mobile.imagePadding};
    margin-top: ${(props) =>
      props.hidePadding ? '0' : props.theme.item.mobile.imagePadding};
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

const MenuItemBackgroundImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const MenuItemBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 1;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const MenuItemImage = ({ imageUrl, hasBack }) => {
  const { bgColors, header } = useTheme()
  const { hasLoaded, hasError } = useImage(imageUrl)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const hidePadding =
    bgColors.primary === header.primary && hasBack ? true : false

  return (
    <MenuItemImageView hidePadding={hidePadding}>
      {isLoading && (
        <MenuItemBackgroundImageContainer>
          <MenuItemImageLoading>
            <ClipLoader size={30} loading={true} color={bgColors.primary} />
          </MenuItemImageLoading>
        </MenuItemBackgroundImageContainer>
      )}
      {hasLoaded && (
        <MenuItemBackgroundImageContainer>
          <MenuItemBackgroundImage style={bgStyle}>
            &nbsp;
          </MenuItemBackgroundImage>
        </MenuItemBackgroundImageContainer>
      )}
    </MenuItemImageView>
  )
}

MenuItemImage.displayName = 'MenuItemImage'
MenuItemImage.propTypes = {
  imageUrl: propTypes.string,
  hasBack: propTypes.bool,
}

export default MenuItemImage
