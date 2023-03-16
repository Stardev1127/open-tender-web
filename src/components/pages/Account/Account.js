import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import {
  fetchAnnouncementPage,
  fetchCustomer,
  fetchCustomerCreditCards,
  fetchCustomerFavorites,
  fetchCustomerGroupOrders,
  fetchCustomerOrders,
  fetchCustomerRewards,
  fetchDeals,
  selectAnnouncementsPage,
  selectCustomer,
  selectCustomerGroupOrders,
  // selectCustomerLoyaltyProgram,
  selectCustomerOrders,
  selectCustomerRewards,
  selectDeals,
  selectHasAnnouncementsPage,
} from '@open-tender/redux'

import { selectBrand, closeModal, selectContentSection } from '../../../slices'
import {
  Background,
  BackgroundImage,
  Content,
  Header,
  HeaderLogo,
  Main,
  Welcome,
} from '../..'
import { Cart, NavMenu, User } from '../../buttons'
import AccountButtons from './AccountButtons'
import AccountContent from './AccountContent'
import AccountLoyalty from './AccountLoyalty'
import AccountRewards from './AccountRewards'
import AccountDeals from './AccountDeals'
import AccountGroupOrders from './AccountGroupOrders'
import AccountOrders from './AccountOrders'
import AccountSlider from './AccountSlider'

export const AccountWrapper = styled.div`
  label: AccountWrapper;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0);
`

export const AccountView = styled.div`
  label: AccountView;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 0 10rem;
  }
`

export const AccountMobile = styled.div`
  label: AccountMobile;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

export const AccountHero = styled.div`
  label: AccountHero;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 32rem;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 16rem;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 2rem 0;
  }

  & > div {
    overflow: hidden;
    border-radius: ${(props) => props.theme.border.radius};
  }
`

const hasEntities = (reducer) => {
  if (!reducer) return false
  const { entities, loading, error } = reducer
  if (loading === 'pending' && !entities.length) return false
  return !error && entities.length
}

// const checkLoading = (deals, rewards, orders, loyalty) => {
//   return (
//     deals.loading === 'pending' ||
//     rewards.loading === 'pending' ||
//     orders.loading === 'pending' ||
//     loyalty.loading === 'pending'
//   )
// }

const Account = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()
  const { auth, profile } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const {
    title: siteTitle,
    has_deals,
    has_rewards,
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
    // displayLogo,
    displayLogoMobile,
    displayed: displayedDesktop,
    displayedMobile,
    showFirstName,
    punctuation,
  } = useSelector(selectContentSection('account')) || {}
  const showLogo = isMobile ? displayLogoMobile : false
  const firstName = profile ? profile.first_name : null
  const greeting =
    firstName && showFirstName
      ? `${title}, ${firstName}${punctuation}`
      : `${title}${punctuation}`
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

  const rewards = useSelector(selectCustomerRewards)
  const hasRewards = has_rewards && displayed.includes('REWARDS')
  const displayRewads = hasRewards && hasEntities(rewards)
  const rewardsSection = displayRewads
    ? (key) => <AccountRewards key={key} rewards={rewards.entities} />
    : null

  const orders = useSelector(selectCustomerOrders)
  const hasOrders = displayed.includes('ORDERS')
  const displayOrders = hasOrders && hasEntities(orders)
  const ordersSection = displayOrders
    ? (key) => <AccountOrders key={key} orders={orders.entities} />
    : null

  const groupOrders = useSelector(selectCustomerGroupOrders)
  const hasGroupOrders = displayed.includes('GROUP_ORDERS')
  const displayGroupOrders = hasGroupOrders && hasEntities(groupOrders)
  const groupOrdersSection = displayGroupOrders
    ? (key) => <AccountGroupOrders key={key} orders={groupOrders.entities} />
    : null

  // const loyalty = useSelector(selectCustomerLoyaltyProgram)
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

  const announcements = useSelector(selectAnnouncementsPage('ACCOUNT'))
  const hasAnnouncements = useSelector(selectHasAnnouncementsPage('ACCOUNT'))
  const displayAnnouncements =
    displayed.includes('ANNOUNCEMENTS') && hasAnnouncements
  const announcementsSection = displayAnnouncements
    ? (key) => <AccountSlider announcements={announcements} key={key} />
    : null

  const sections = {
    CONTENT: contentSection,
    LOYALTY: loyaltySection,
    REWARDS: rewardsSection,
    DEALS: dealsSection,
    ORDERS: ordersSection,
    GROUP_ORDERS: groupOrdersSection,
    HERO: heroSection,
    ANNOUNCEMENTS: announcementsSection,
  }
  const displayedSections = displayed
    ? displayed.map((i) => sections[i] && sections[i](i)).filter(Boolean)
    : null

  // const isLoading = checkLoading(deals, rewards, orders, loyalty)

  const buttons = useRef(null)
  const buttonsHeight = buttons.current?.offsetHeight || 100
  const buttonsHeightRem = `${(buttonsHeight / 10).toFixed(1)}rem`
  const buttonsStyle = isMobile ? { paddingBottom: buttonsHeightRem } : null

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (!auth) navigate('/guest')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomer())
    dispatch(fetchCustomerCreditCards(true))
    dispatch(fetchCustomerOrders(20))
    dispatch(fetchCustomerFavorites())
    dispatch(fetchCustomerGroupOrders())
  }, [token, dispatch, navigate])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('ACCOUNT'))
  }, [dispatch])

  useEffect(() => {
    if (hasDeals) dispatch(fetchDeals())
  }, [hasDeals, dispatch])

  useEffect(() => {
    if (hasRewards) dispatch(fetchCustomerRewards())
  }, [hasRewards, dispatch])

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>
          {greeting} | {siteTitle}
        </title>
      </Helmet>
      <Background
        imageUrl={background}
        announcements={displayAnnouncements ? announcements : null}
        style={{ top: theme.layout.navHeight }}
      />
      <Content maxWidth="76.8rem" hasFooter={isMobile ? false : true}>
        <Header
          style={{ boxShadow: 'none' }}
          maxWidth="100%"
          borderColor={!isMobile ? theme.border.color : undefined}
          title={showLogo ? <HeaderLogo /> : null}
          left={isMobile ? <User /> : <HeaderLogo />}
          right={
            <>
              {!isMobile && <User />}
              <Cart />
              <NavMenu />
            </>
          }
        />
        <Main>
          <AccountWrapper>
            <AccountView style={buttonsStyle}>
              <Welcome
                title={greeting}
                subtitle={!isMobile ? subtitle : null}
              />
              {isMobile && <AccountMobile>{displayedSections}</AccountMobile>}
              <AccountButtons ref={buttons} />
              {!isMobile && <AccountMobile>{displayedSections}</AccountMobile>}
            </AccountView>
          </AccountWrapper>
        </Main>
      </Content>
    </>
  )
}

Account.displayName = 'Account'
export default Account
