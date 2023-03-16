import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { slugify, stripTags } from '@open-tender/js'
import {
  selectMenuSlug,
  setCurrentCategory,
  setCurrentVendor,
} from '@open-tender/redux'
import { BgImage, Body, Heading } from '@open-tender/components'

const MenuSquareView = styled.div`
  position: relative;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${(props) => props.theme.categories.desktop.width};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 33.33333%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: ${(props) => props.theme.categories.mobile.width};
  }
`

const MenuSquareButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.theme.categories.desktop.gapHalf};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.categories.mobile.gapHalf};
  }
`

const MenuSquareContainer = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${(props) =>
    props.theme.categories.desktop.backgroundColor};
  border-radius: ${(props) => props.theme.categories.desktop.borderRadius};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    background-color: ${(props) =>
      props.theme.categories.mobile.backgroundColor};
    border-radius: ${(props) => props.theme.categories.mobile.borderRadius};
  }
`

const MenuSquareImage = styled(BgImage)`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: ${(props) => props.theme.categories.desktop.transition};
  transform: scale(${(props) => props.theme.categories.desktop.imageScale});
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    transition: ${(props) => props.theme.categories.mobile.transition};
    transform: scale(1);
  }

  button:hover & {
    transform: scale(
      ${(props) => props.theme.categories.desktop.imageScaleHover}
    );

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      transform: scale(1);
    }
  }
`

const MenuSquareOverlay = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: ${(props) => props.theme.categories.desktop.transition};
  background-color: ${(props) => props.theme.categories.desktop.overlayColor};
  opacity: ${(props) => props.theme.categories.desktop.overlayOpacity};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    transition: ${(props) => props.theme.categories.mobile.transition};
    background-color: ${(props) => props.theme.categories.mobile.overlayColor};
    opacity: ${(props) => props.theme.categories.mobile.overlayOpacity};
  }

  button:hover & {
    opacity: ${(props) => props.theme.categories.desktop.overlayOpacityHover};

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      opacity: ${(props) => props.theme.categories.mobile.overlayOpacity};
    }
  }
`

const MenuSquareContent = styled.div`
  position: relative;
  z-index: 3;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  text-align: ${(props) => props.theme.categories.desktop.textAlign};
  padding-top: ${(props) => props.theme.categories.desktop.paddingTop};
  padding-bottom: ${(props) => props.theme.categories.desktop.paddingBottom};
  padding-left: ${(props) => props.theme.categories.desktop.paddingHorizontal};
  padding-right: ${(props) => props.theme.categories.desktop.paddingHorizontal};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: ${(props) => props.theme.categories.mobile.textAlign};
    padding-top: ${(props) => props.theme.categories.mobile.paddingTop};
    padding-bottom: ${(props) => props.theme.categories.mobile.paddingBottom};
    padding-left: ${(props) => props.theme.categories.mobile.paddingHorizontal};
    padding-right: ${(props) =>
      props.theme.categories.mobile.paddingHorizontal};
  }
`

const MenuSquareTitle = styled(Heading)`
  transition: ${(props) => props.theme.categories.desktop.transition};
  font-size: ${(props) => props.theme.categories.desktop.titleSize};
  color: ${(props) => props.theme.categories.desktop.titleColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.categories.mobile.titleSize};
    color: ${(props) => props.theme.categories.mobile.titleColor};
  }

  button:hover & {
    color: ${(props) => props.theme.categories.desktop.titleColorHover};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.categories.mobile.titleColorHover};
    }
  }
`

const MenuSquareDescription = styled(Body)`
  margin: 0.5rem 0 0;
  display: ${(props) =>
    props.theme.categories.desktop.showDescription ? 'block' : 'none'};
  transition: ${(props) => props.theme.categories.desktop.transition};
  font-size: ${(props) => props.theme.categories.desktop.subtitleSize};
  color: ${(props) => props.theme.categories.desktop.subtitleColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: ${(props) =>
      props.theme.categories.mobile.showDescription ? 'block' : 'none'};
    font-size: ${(props) => props.theme.categories.mobile.subtitleSize};
    color: ${(props) => props.theme.categories.mobile.subtitleColor};
  }

  button:hover & {
    color: ${(props) => props.theme.categories.desktop.subtitleColorHover};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.categories.mobile.subtitleColorHover};
    }
  }
`

const MenuSquare = ({ category }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const {
    name,
    description,
    small_image_url,
    large_image_url,
    app_image_url,
    revenue_center_id,
  } = category
  const imageUrl = app_image_url || small_image_url || large_image_url
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const desc = description ? stripTags(description) : null

  const view = (evt) => {
    evt.preventDefault()
    if (revenue_center_id) {
      dispatch(setCurrentVendor(category))
      navigate(`${menuSlug}/vendor/${slugify(category.name)}`)
    } else {
      dispatch(setCurrentCategory(category))
      navigate(`${menuSlug}/category/${slugify(category.name)}`)
    }
  }

  return (
    <MenuSquareView>
      <MenuSquareButton onClick={view}>
        <MenuSquareContainer>
          <MenuSquareImage style={bgStyle} />
          <MenuSquareOverlay />
          <MenuSquareContent>
            <MenuSquareTitle as="p">{name}</MenuSquareTitle>
            {desc && (
              <MenuSquareDescription as="p">{desc}</MenuSquareDescription>
            )}
          </MenuSquareContent>
        </MenuSquareContainer>
      </MenuSquareButton>
    </MenuSquareView>
  )
}

MenuSquare.displayName = 'MenuSquare'
MenuSquare.propTypes = {
  category: propTypes.object,
}

export default MenuSquare
