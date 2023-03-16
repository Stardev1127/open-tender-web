import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import {
  dateForWeekday,
  dateStrMinutesToIso,
  dateToZonedDateStr,
  slugify,
  timezoneMap,
} from '@open-tender/js'
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
import CateringSiteCategory from './CateringSiteCategory'

const CateringSiteView = styled.div``

const CateringSiteMenu = styled.div`
  max-width: 128rem;
  margin: 0 auto ${(props) => props.theme.layout.margin};
`

const CateringSite = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const { catering_id, timezone, title: siteTitle } = useSelector(selectBrand)
  const [revenueCenterId] = useState(catering_id)
  const { background, mobile, title, subtitle, content } = useSelector(
    selectContentSection('cateringSite')
  )
  const serviceType = 'DELIVERY'
  const tz = timezoneMap[timezone]
  const nextDate = dateForWeekday('MONDAY')
  const dateStr = dateToZonedDateStr(nextDate, tz, 'yyyy-MM-dd')
  const requestedAt = dateStrMinutesToIso(dateStr, 720, tz)
  const { categories } = useSelector(selectMenu)
  const announcements = useSelector(selectAnnouncementsPage('CATERING'))

  const scrollToMenu = () => {
    scroller.scrollTo('cateringSite', {
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
    dispatch(fetchAnnouncementPage('CATERING'))
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
                Browse Our Catering Menu
              </ButtonStyled>
            </BackgroundContent>
          </PageHero>
          <CateringSiteView>
            <PageIntro content={content} />
            <Element name="cateringSite">
              <CateringSiteMenu>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    id={slugify(category.name)}
                    name="section"
                  >
                    <CateringSiteCategory category={category} />
                    {category.children.map((category) => (
                      <CateringSiteCategory
                        key={category.id}
                        category={category}
                        isChild={true}
                      />
                    ))}
                  </div>
                ))}
              </CateringSiteMenu>
            </Element>
          </CateringSiteView>
        </Main>
      </Content>
    </>
  )
}

export default CateringSite
