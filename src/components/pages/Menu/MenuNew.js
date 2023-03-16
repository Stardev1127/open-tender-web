import { useContext, useRef } from 'react'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import { selectDisplaySettings } from '../../../slices'
import { Content, Loading, Main, PageHero, ScreenreaderTitle } from '../..'
import { MenuContext } from './Menu'
import MenuHeader from './MenuHeader'
import MenuBrowse from './MenuBrowse'
import MenuTop from './MenuTop'

const MenuNewView = styled.div``

const MenuAnnouncements = styled.div``

const MenuLoading = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuNew = () => {
  const heroRef = useRef()
  const {
    announcements,
    categories,
    displaySettings,
    isLoading,
    menuContent,
    revenueCenters,
    siteTitle,
  } = useContext(MenuContext)
  const { menuType: menuTypeDesktop, menuTypeMobile } = displaySettings
  const menuType = isMobile ? menuTypeMobile : menuTypeDesktop
  const isScrollable = menuType === 'SCROLLABLE'
  const { background, mobile, loadingMessage } = menuContent
  const { menuHero, menuHeroMobile } = useSelector(selectDisplaySettings)
  const showHero = isMobile ? menuHeroMobile : menuHero
  const imageUrl = showHero ? (isMobile ? mobile : background) : null
  const heroHeight = isMobile ? '24rem' : '44rem'
  const isRcs = revenueCenters && revenueCenters.length ? true : false

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        <MenuHeader />
        <Main>
          <ScreenreaderTitle>Menu</ScreenreaderTitle>
          <MenuNewView>
            <MenuAnnouncements ref={heroRef}>
              <PageHero
                announcements={announcements}
                height={heroHeight}
                imageUrl={imageUrl}
              />
            </MenuAnnouncements>
            {isLoading ? (
              <MenuLoading>
                <Loading text={loadingMessage} />
              </MenuLoading>
            ) : (
              <>
                <MenuTop />
                {!isScrollable && (
                  <MenuBrowse
                    isRcs={isRcs}
                    categories={revenueCenters || categories}
                  />
                )}
              </>
            )}
          </MenuNewView>
        </Main>
      </Content>
    </>
  )
}

MenuNew.displayName = 'MenuNew'

export default MenuNew
