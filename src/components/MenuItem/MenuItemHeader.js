import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCustomer, selectCustomerFavorites } from '@open-tender/redux'
import { formatDollars, makeItemSignature } from '@open-tender/js'
import { isMobile } from 'react-device-detect'
import { Body, Heading, Points, Preface } from '@open-tender/components'
import { MenuItemFavorite, MenuItemPriceCals } from '..'
import { XCircle } from '../icons'
import MenuItemSelections from './MenuItemSelections'

const MenuItemHeaderView = styled.div`
  background-color: ${(props) => props.theme.bgColors.primary};
  transition: ${(props) => props.theme.links.transition};
`

const MenuItemHeaderContainer = styled.div``

const MenuItemHeaderPlaceholder = styled.div`
  height: 4.5rem;
`

const MenuItemScroll = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 4.5rem;
  padding: 0 0 0 ${(props) => props.theme.item.desktop.padding};
  transition: ${(props) => props.theme.links.transition};
  background-color: ${(props) => props.theme.bgColors.primary};
  opacity: ${(props) => (props.stuck ? '1' : '0')};
  visibility: ${(props) => (props.stuck ? 'visible' : 'hidden')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 0 ${(props) => props.theme.item.mobile.padding};
  }
`

const MenuItemScrollInfo = styled.div`
  flex: 1 1 auto;
`

const MenuItemScrollName = styled(Heading)`
  display: block;
  margin-left: -0.1rem;
  line-height: 1;
`

const MenuItemScrollPrice = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuItemScrollClose = styled.button`
  display: block;
  width: 4.5rem;
  margin: 0 0 0 1rem;
  height: 4.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.links.dark.color};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
  }

  &:hover {
    color: ${(props) => props.theme.links.dark.hover};
  }
`

const MenuItemInfo = styled.div`
  transition: ${(props) => props.theme.links.transition};
  padding: ${(props) => props.theme.item.desktop.padding};
  padding-bottom: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.item.mobile.padding};
    padding-bottom: 0;
  }

  &.isCustomize {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const MenuItemDetails = styled.div`
  padding: 0 ${(props) => props.theme.item.desktop.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.item.mobile.padding};
  }
`

const MenuItemNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: palegreen;
`

const MenuItemName = styled(Heading)`
  display: block;
  margin-left: -0.1rem;
  transition: ${(props) => props.theme.links.transition};
`

const MenuItemPoints = styled.span`
  display: inline-block;
  margin: 0 0 0 1.5rem;
`

const MenuItemTagsAllergens = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 1rem 0 0;

  span {
    display: block;
  }

  span + span {
    margin-left: 2rem;
  }
`

const MenuItemTag = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  }
`

const MenuItemAllergen = styled(Preface)`
  color: ${(props) => props.theme.colors.allergens};
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  }
`

const MenuItemDesc = styled(Body)`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuItemHeader = ({
  cancel,
  builtItem,
  decrementOption,
  displaySettings,
  pointsIcon,
  hasCustomize,
  isCustomize,
  setIsCustomize,
  scrollContainer,
  topOffset,
}) => {
  const headerRef = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { auth } = useSelector(selectCustomer)
  const { lookup } = useSelector(selectCustomerFavorites)
  const signature = makeItemSignature(builtItem)
  const favoriteId = lookup && signature ? lookup[signature] : null
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const {
    name,
    description,
    quantity,
    price,
    totalPrice,
    cals,
    totalCals,
    totalPoints,
    tags,
    allergens,
    groups,
  } = builtItem
  const hasTags = showTags && Array.isArray(tags) && tags.length ? true : false
  const hasAllergens =
    showAllergens && Array.isArray(allergens) && allergens.length ? true : false
  const hasTagsAllergens = hasTags || hasAllergens ? true : false
  const sizeGroup = groups ? groups.find((i) => i.isSize) : null
  const defaultOption = !sizeGroup
    ? null
    : sizeGroup.options.find((i) => i.isDefault) || sizeGroup.options[0]
  const currentPrice = totalPrice
    ? totalPrice
    : defaultOption
    ? defaultOption.price
    : price
  const displayPrice = formatDollars(currentPrice)
  const displayCals = showCals ? (totalPrice ? totalCals : cals) : null
  const missingSize = sizeGroup
    ? !sizeGroup.options.find((i) => i.quantity >= 1)
    : false
  const hasGroups = groups ? groups.filter((g) => !g.isSize).length > 0 : false
  const groupsBelowMin = groups
    ? groups.filter((g) => g.quantity < g.min).length > 0
    : false
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin
  const requiresCustomization = isIncomplete && !missingSize
  const nonSizeGroups = groups ? groups.filter((i) => !i.isSize) : null

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && topOffset !== null) {
        setStuck(headerRef.current.getBoundingClientRect().top <= topOffset - 1)
      }
    }
    scrollContainer && scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer &&
        scrollContainer.removeEventListener('scroll', () => handleScroll)
    }
  }, [topOffset, scrollContainer, isCustomize])

  const priceCals = (style = {}, size = 'main', showPoints = true) => (
    <MenuItemPriceCals
      price={displayPrice}
      cals={displayCals}
      size={size}
      style={style}
    >
      {showPoints && totalPoints ? (
        <MenuItemPoints>
          <Points
            points={totalPoints}
            icon={pointsIcon}
            title="Points can be applied at checkout"
          />
        </MenuItemPoints>
      ) : null}
    </MenuItemPriceCals>
  )

  return (
    <MenuItemHeaderView ref={headerRef}>
      <MenuItemScroll stuck={hasCustomize ? isCustomize : stuck}>
        <MenuItemScrollInfo>
          <MenuItemScrollName size={isMobile ? 'main' : 'big'}>
            {name}
          </MenuItemScrollName>
        </MenuItemScrollInfo>
        <MenuItemScrollPrice>
          {priceCals({}, isMobile ? 'small' : 'main', isMobile ? false : true)}
          <MenuItemScrollClose onClick={cancel}>
            <XCircle size={24} />
          </MenuItemScrollClose>
        </MenuItemScrollPrice>
      </MenuItemScroll>
      {!isCustomize ? (
        <MenuItemHeaderContainer>
          <MenuItemInfo>
            <MenuItemNameContainer>
              <MenuItemName size={isMobile ? 'big' : 'xBig'} as="p">
                {name}
              </MenuItemName>
              {auth && (
                <MenuItemFavorite
                  size={isMobile ? 18 : 24}
                  favoriteId={favoriteId}
                  builtItem={builtItem}
                  disabled={isIncomplete}
                />
              )}
            </MenuItemNameContainer>
            {priceCals({ margin: '1rem 0 0' }, isMobile ? 'main' : 'big')}
          </MenuItemInfo>
          <MenuItemDetails>
            {hasTagsAllergens && (
              <MenuItemTagsAllergens>
                {hasTags
                  ? tags.map((tag) => (
                      <MenuItemTag key={tag}>{tag}</MenuItemTag>
                    ))
                  : null}
                {hasAllergens
                  ? allergens.map((allergen) => (
                      <MenuItemAllergen key={allergen}>
                        {allergen}
                      </MenuItemAllergen>
                    ))
                  : null}
              </MenuItemTagsAllergens>
            )}
            {description ? (
              <MenuItemDesc as="p">{description}</MenuItemDesc>
            ) : null}
          </MenuItemDetails>
          {hasCustomize && hasGroups ? (
            <MenuItemSelections
              groups={nonSizeGroups}
              decrementOption={decrementOption}
              requiresCustomization={requiresCustomization}
              setIsCustomize={setIsCustomize}
            />
          ) : null}
        </MenuItemHeaderContainer>
      ) : hasCustomize ? (
        <MenuItemHeaderPlaceholder />
      ) : null}
    </MenuItemHeaderView>
  )
}

MenuItemHeader.displayName = 'MenuItemHeader'
MenuItemHeader.propTypes = {
  cancel: propTypes.func,
  builtItem: propTypes.object,
  decrementOption: propTypes.func,
  displaySettings: propTypes.object,
  pointsIcon: propTypes.element,
  hasCustomize: propTypes.bool,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
  scrollContainer: propTypes.any,
  topOffset: propTypes.number,
}

export default MenuItemHeader
