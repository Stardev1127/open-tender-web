import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { useTheme } from '@emotion/react'
import {
  fetchAnnouncementPage,
  fetchDeals,
  selectCustomer,
  selectAnnouncementsPage,
  selectDeals,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import {
  Background,
  BackgroundImage,
  Content,
  HeaderGuest,
  Main,
  Welcome,
} from '../..'
import {
  AccountContent,
  AccountDeals,
  AccountHero,
  AccountLoyalty,
  AccountMobile,
  AccountSlider,
  AccountView,
  AccountWrapper,
} from '../Account'
import GuestButtons from './GuestButtons'

const hasEntities = (reducer) => {
  if (!reducer) return false
  const { entities, loading, error } = reducer
  if (loading === 'pending' && !entities.length) return false
  return !error && entities.length
}

const Guest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { auth } = useSelector(selectCustomer)
  const {
    title: siteTitle,
    has_deals,
    has_loyalty,
    has_thanx,
    has_levelup,
  } = useSelector(selectBrand)
  const {
    title,
    subtitle,
    background,
    mobile,
    content,
    showGuest,
    displayed: displayedDesktop,
    displayedMobile,
  } = useSelector(selectContentSection('guest')) || {}
  const displayed = isMobile ? displayedMobile : displayedDesktop

  const hasContent = displayed.includes('CONTENT') && content && content.length
  const contentSection = hasContent
    ? (key) => <AccountContent key={key} content={content} />
    : null

  const deals = useSelector(selectDeals)
  const hasDeals = has_deals && displayed.includes('DEALS')
  const displayDeals = hasDeals && hasEntities(deals)
  const dealsSection = displayDeals
    ? (key) => <AccountDeals key={key} deals={deals.entities} />
    : null

  const hasLoyalty = has_loyalty || has_thanx || has_levelup
  const displayLoyalty = displayed.includes('LOYALTY') && hasLoyalty
  const loyaltySection = displayLoyalty
    ? (key) => <AccountLoyalty key={key} />
    : null

  const hasHero = isMobile ? mobile : background
  const displayHero = displayed.includes('HERO') && hasHero
  const heroSection = displayHero
    ? (key) => (
        <AccountHero key={key}>
          <BackgroundImage imageUrl={mobile} />
        </AccountHero>
      )
    : null

  const announcements = useSelector(selectAnnouncementsPage('GUEST'))
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('GUEST'))
  const displayAnnouncements =
    displayed.includes('ANNOUNCEMENTS') && hasAnnouncements
  const announcementsSection = displayAnnouncements
    ? (key) => <AccountSlider announcements={announcements} key={key} />
    : null

  const sections = {
    CONTENT: contentSection,
    LOYALTY: loyaltySection,
    DEALS: dealsSection,
    HERO: heroSection,
    ANNOUNCEMENTS: announcementsSection,
  }
  const displayedSections = displayed
    ? displayed.map((i) => sections[i] && sections[i](i)).filter(Boolean)
    : null

  const buttons = useRef(null)
  const buttonsHeight = buttons.current?.offsetHeight || 100
  const buttonsHeightRem = `${(buttonsHeight / 10).toFixed(1)}rem`
  const buttonsStyle = isMobile ? { paddingBottom: buttonsHeightRem } : null

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      navigate('/account')
    } else if (!showGuest) {
      navigate('/order-type')
    }
  }, [auth, showGuest, navigate])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('GUEST'))
  }, [dispatch])

  useEffect(() => {
    if (hasDeals) dispatch(fetchDeals())
  }, [hasDeals, dispatch])

  if (auth || !showGuest) return null

  return (
    <>
      <Helmet>
        <title>Welcome | {siteTitle}</title>
      </Helmet>
      <Background
        imageUrl={background}
        announcements={displayAnnouncements ? announcements : null}
        style={{ top: theme.layout.navHeight }}
      />
      <Content maxWidth="76.8rem" hasFooter={isMobile ? false : true}>
        <HeaderGuest maxWidth="100%" />
        <Main>
          <AccountWrapper>
            <AccountView style={buttonsStyle}>
              <Welcome title={title} subtitle={!isMobile ? subtitle : null} />
              {isMobile && <AccountMobile>{displayedSections}</AccountMobile>}
              <GuestButtons ref={buttons} />
              {!isMobile && <AccountMobile>{displayedSections}</AccountMobile>}
            </AccountView>
          </AccountWrapper>
        </Main>
      </Content>
    </>
  )
}

Guest.displayName = 'Guest'
export default Guest
