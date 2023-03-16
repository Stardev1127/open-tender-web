import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { scroller, Element } from 'react-scroll'
import { Helmet } from 'react-helmet'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import {
  fetchAnnouncementPage,
  selectAnnouncementsPage,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { selectConfig, selectBrand } from '../../../slices'
import {
  BackgroundContent,
  Content,
  Main,
  HeaderSite,
  PageHero,
  PageIntro,
} from '../..'

const AboutView = styled.div``

const About = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const brand = useSelector(selectBrand)
  const { about } = useSelector(selectConfig)
  const { background, mobile, title, subtitle, content } = about
  const announcements = useSelector(selectAnnouncementsPage('MENU'))

  const scrollToMenu = () => {
    scroller.scrollTo('aboutCards', {
      duration: 500,
      smooth: true,
      offset: -120,
    })
  }

  useEffect(() => {
    dispatch(fetchAnnouncementPage('MENU'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>About | {brand.title}</title>
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
                Learn More
              </ButtonStyled>
            </BackgroundContent>
          </PageHero>
          <AboutView>
            <PageIntro content={content} />
            <Element name="aboutCards"></Element>
          </AboutView>
        </Main>
      </Content>
    </>
  )
}

export default About
