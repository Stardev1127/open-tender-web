import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Helmet from 'react-helmet'
import {
  fetchAnnouncementPage,
  selectAnnouncementsPage,
} from '@open-tender/redux'
import {
  selectContent,
  closeModal,
  selectBrand,
  selectCateringOnly,
} from '../../../slices'
import { Back, NavMenu } from '../../buttons'
import {
  Background,
  Content,
  Header,
  HtmlContent,
  Main,
  PageTitle,
} from '../..'
import OrderTypes from './OrderTypes'
import HeaderGuest from '../../HeaderGuest'
import { useTheme } from '@emotion/react'

const OrderTypeView = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) =>
      props.showGuest ? props.theme.layout.padding : props.theme.layout.margin}
    0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const OrderTypeContent = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const OrderType = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const { title: siteTitle } = useSelector(selectBrand)
  const cateringOnly = useSelector(selectCateringOnly)
  const { orderType, guest } = useSelector(selectContent)
  const { showGuest } = guest || {}
  const { background, title, subtitle, content } = orderType
  const hasContent = !!(content && content.length)
  const announcements = useSelector(selectAnnouncementsPage('ORDER_TYPE'))

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

  useEffect(() => {
    if (cateringOnly) navigate('/catering-address')
  }, [cateringOnly, navigate])

  useEffect(() => {
    dispatch(fetchAnnouncementPage('ORDER_TYPE'))
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>Order Type | {siteTitle}</title>
      </Helmet>
      <Background
        imageUrl={background}
        announcements={announcements}
        style={showGuest ? null : { top: theme.layout.navHeight }}
      />
      <Content maxWidth="76.8rem">
        {showGuest ? (
          <Header maxWidth="76.8rem" left={<Back />} right={<NavMenu />} />
        ) : (
          <HeaderGuest maxWidth="100%" />
        )}
        <Main>
          <OrderTypeView showGuest={showGuest}>
            <PageTitle
              title={title}
              subtitle={subtitle}
              style={{ textAlign: 'left', maxWidth: '100%' }}
            />
            <OrderTypes />
            {hasContent && (
              <OrderTypeContent>
                <HtmlContent content={content} />
              </OrderTypeContent>
            )}
          </OrderTypeView>
        </Main>
      </Content>
    </>
  )
}

OrderType.displayName = 'OrderType'
export default OrderType
