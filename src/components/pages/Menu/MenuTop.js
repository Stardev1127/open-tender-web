import { useContext, useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { animateScroll as scroll } from 'react-scroll'
import {
  selectCustomerFavorites,
  selectCustomerOrders,
  selectMenuSlug,
} from '@open-tender/redux'
import {
  capitalize,
  makeFavorites,
  makeFeatured,
  makeMenuItemLookup,
  makeRecents,
  makeUniqueDisplayItems,
} from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { selectMenuSection, setMenuSection } from '../../../slices'
import { Container, Loading, Reward, SeeMoreLink } from '../..'
import { MenuContext } from './Menu'
import MenuItem from './MenuItem'
import MenuScrollable from './MenuScrollable'

const MenuTopView = styled.div`
  margin: ${(props) => props.theme.layout.margin} auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto;
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuTopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 0rem;
  }
`

const MenuTopNav = styled.div`
  flex: 1;

  button {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-right: ${(props) => props.marginRight}rem;

      span {
        font-size: ${(props) => props.theme.fonts.sizes[props.fontSize]};
      }
    }
  }

  button:last-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin-right: 0;
    }
  }
`

const MenuTopMore = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  margin: 0 0 0.2rem;
`

const MenuTopButtonView = styled.button`
  padding: 0 0 0.2rem;
  margin: 0 4rem 0 0;
  border-bottom: ${(props) => props.theme.border.width} solid transparent;
  border-color: ${(props) =>
    props.isActive ? props.theme.border.color : 'transparent'};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 3rem 0 0;
  }

  span {
    font-weight: ${(props) =>
      props.theme.fonts[props.isActive ? 'headings' : 'body'].weight};
  }
`

const MenuTopButton = ({ title, section, menuSection, onClick }) => {
  return (
    <MenuTopButtonView isActive={menuSection === section} onClick={onClick}>
      <MenuTopTitle>{title}</MenuTopTitle>
    </MenuTopButtonView>
  )
}

MenuTopButton.displayName = 'MenuTopButton'
MenuTopButton.propTypes = {
  section: propTypes.string,
  menuSection: propTypes.string,
  onClick: propTypes.func,
}

const MenuTopTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuTopItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  margin: 0 -${(props) => props.theme.layout.padding} -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile} -1.5rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const MenuTopItem = styled.div`
  flex: ${(props) => (props.count >= 4 ? '1' : '0')} 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: 1390px) {
    flex: 0 0 31rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 20rem;
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    height: 100%;
  }
`

const MenuTop = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels + 30
  const menuSection = useSelector(selectMenuSection)
  const menuSlug = useSelector(selectMenuSlug)
  const {
    categories,
    deals,
    displaySettings,
    menuContent,
    setHasTop,
    soldOut,
  } = useContext(MenuContext)
  const { displayed: displayedDesktop, displayedMobile } = menuContent
  const displayed = isBrowser ? displayedDesktop : displayedMobile
  const { menuType: menuTypeDesktop, menuTypeMobile } = displaySettings
  const menuType = isBrowser ? menuTypeDesktop : menuTypeMobile
  const isScrollable = menuType === 'SCROLLABLE'
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])

  // handle featured
  const featured = makeFeatured(categories)

  // handle favorites
  const favs = useSelector(selectCustomerFavorites)
  const favorites = useMemo(
    () => makeFavorites(favs.entities, itemLookup, soldOut),
    [favs.entities, itemLookup, soldOut]
  )
  const hasFavorites = favorites && favorites.length > 0
  const loadingFavs = favs.loading === 'pending' && !hasFavorites ? true : false

  // handle recents
  const orders = useSelector(selectCustomerOrders)
  const displayItems = useMemo(
    () => makeUniqueDisplayItems(orders.entities),
    [orders.entities]
  )
  const recents = useMemo(
    () => makeRecents(displayItems, itemLookup, soldOut),
    [displayItems, itemLookup, soldOut]
  )
  const hasRecents = recents.length > 0
  const loadingRecents =
    orders.loading === 'pending' && !hasRecents ? true : false

  // tie it all together
  const sections = {
    FEATURED: featured,
    RECENTS: recents,
    FAVORITES: favorites,
    DEALS: deals,
  }
  const displayedSections = displayed.reduce((obj, i) => {
    return sections[i].length > 0 ? { ...obj, [i]: sections[i] } : obj
  }, {})
  const displayedKeys = Object.keys(displayedSections)
  const marginRight = displayedKeys.length > 2 ? '1.5' : '3'
  const fontSize = displayedKeys.length > 2 ? 'main' : 'big'
  const firstSection = displayedKeys[0] || null
  const currentSection = displayedSections[menuSection] || []
  const hasSection = currentSection.length > 0
  const currentTitle = isBrowser ? ` ${capitalize(menuSection)}` : ''
  const currentDisplayed = currentSection.slice(0, 4)
  const displayMore = currentSection.length > 4
  const isDeals = menuSection === 'DEALS'
  const itemKey = isDeals ? 'discount_id' : 'id'
  const isLoading = loadingRecents || loadingFavs
  const hasItems = displayedKeys.length > 0
  const showLoading = isLoading && !hasItems

  const scrollToMenu = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById('full-menu')
    const position = element.offsetTop - topOffset
    scroll.scrollTo(position, {
      duration: 500,
      smooth: true,
      offset: 0,
    })
  }

  useEffect(() => {
    if (!hasSection) dispatch(setMenuSection(firstSection))
  }, [hasSection, firstSection, dispatch])

  useEffect(() => {
    setHasTop(hasItems)
  }, [hasItems, setHasTop])

  if (!isLoading && !hasItems && !isScrollable) return null

  return showLoading ? (
    <MenuTopView>
      <Container>
        <Loading text="Checking for recents and favorites..." />
      </Container>
    </MenuTopView>
  ) : isScrollable ? (
    <MenuScrollable displayedSections={displayedSections} />
  ) : (
    <Container>
      <MenuTopView className="compact">
        <MenuTopHeader>
          <MenuTopNav marginRight={marginRight} fontSize={fontSize}>
            {displayedKeys.map((section) => (
              <MenuTopButton
                key={section}
                title={capitalize(section)}
                section={section}
                menuSection={menuSection}
                onClick={() => dispatch(setMenuSection(section))}
              />
            ))}
            {isBrowser && (
              <MenuTopButton
                title="Full Menu"
                section="FULL_MENU"
                menuSection={menuSection}
                onClick={scrollToMenu}
              />
            )}
          </MenuTopNav>
          <MenuTopMore>
            {displayMore && (
              <SeeMoreLink
                text={`View All${currentTitle}`}
                to={`${menuSlug}/${menuSection.toLowerCase()}`}
              />
            )}
          </MenuTopMore>
        </MenuTopHeader>
        {currentDisplayed.length > 0 ? (
          <MenuTopItems>
            {currentDisplayed.map((item, index) => (
              <MenuTopItem
                count={currentDisplayed.length}
                key={`${menuSection}-${item[itemKey]}-${index}`}
              >
                {isDeals ? <Reward item={item} /> : <MenuItem item={item} />}
              </MenuTopItem>
            ))}
          </MenuTopItems>
        ) : null}
      </MenuTopView>
    </Container>
  )
}

MenuTop.displayName = 'MenuTop'

export default MenuTop
