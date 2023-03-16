import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import {
  fetchAllergens,
  fetchAnnouncementPage,
  fetchMenu,
  selectAnnouncementsPage,
  selectMenu,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { selectBrand, selectContentSection } from '../../../slices'
import {
  BackgroundContent,
  Content,
  Main,
  HeaderSite,
  PageHero,
  PageIntro,
} from '../..'
import MenuSiteCategory from './MenuSiteCategory'
import { useTheme } from '@emotion/react'

const MenuSiteView = styled.div``

const MenuSiteMenu = styled.div`
  max-width: 128rem;
  margin: 0 auto;
`

const MenuSite = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { olo_id, title: siteTitle } = useSelector(selectBrand)
  const [revenueCenterId] = useState(olo_id)
  const { background, mobile, title, subtitle, content } = useSelector(
    selectContentSection('menuSite')
  )
  const serviceType = 'PICKUP'
  const requestedAt = 'asap'
  // const geoLatLng = useSelector(selectGeoLatLng)
  const { categories } = useSelector(selectMenu)
  const announcements = useSelector(selectAnnouncementsPage('MENU'))

  const scrollToMenu = () => {
    scroller.scrollTo('menuSite', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  useEffect(() => {
    if (revenueCenterId) {
      dispatch(fetchAllergens())
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
    }
  }, [revenueCenterId, serviceType, requestedAt, dispatch])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('MENU'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Menu | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderSite />
        <Main style={{ paddingTop: '0' }}>
          <PageHero
            announcements={announcements}
            imageUrl={isBrowser ? background : mobile}
          >
            <BackgroundContent
              title={title}
              subtitle={subtitle}
              title_color={colors.light}
              subtitle_color={colors.light}
              vertical="BOTTOM"
              horizontal="LEFT"
            >
              <ButtonStyled onClick={scrollToMenu} size="big" color="light">
                Browse The Menu
              </ButtonStyled>
            </BackgroundContent>
          </PageHero>
          <MenuSiteView>
            <PageIntro content={content} />
            <Element name="menuSite">
              <MenuSiteMenu>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    id={slugify(category.name)}
                    name="section"
                  >
                    <MenuSiteCategory category={category} />
                    {category.children.map((category) => (
                      <MenuSiteCategory
                        key={category.id}
                        category={category}
                        isChild={true}
                      />
                    ))}
                  </div>
                ))}
              </MenuSiteMenu>
            </Element>
          </MenuSiteView>
        </Main>
      </Content>
    </>
  )
}

export default MenuSite
