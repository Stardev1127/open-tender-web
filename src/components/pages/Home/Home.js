import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTheme } from '@emotion/react'
import {
  fetchAnnouncementPage,
  selectAnnouncementsPage,
  selectCustomer,
} from '@open-tender/redux'
import { closeModal, selectBrand, selectContentSection } from '../../../slices'
import { BackgroundContent, Content, HeaderSite, Main, PageIntro } from '../..'
import PageHero from '../../PageHero'

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { colors } = useTheme()
  const brand = useSelector(selectBrand)
  const { background, mobile, title, subtitle, content } = useSelector(
    selectContentSection('home')
  )
  const hasContent = !!(content && content.length)
  const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    navigate(auth ? '/account' : '/guest')
  }, [navigate, auth])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('HOME'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>{brand.title}</title>
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
            />
          </PageHero>
          {hasContent && <PageIntro content={content} />}
        </Main>
      </Content>
    </>
  )
}

Home.displayName = 'Home'
export default Home
