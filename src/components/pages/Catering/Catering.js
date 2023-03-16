import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectOrder,
  setServiceType,
  resetOrder,
  setOrderType,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled, Message } from '@open-tender/components'
import {
  selectBrand,
  selectCateringOnly,
  selectContent,
  selectHasCatering,
} from '../../../slices'
import {
  Background,
  Content,
  Header,
  HeaderGuest,
  HtmlContent,
  Main,
  PageTitle,
  ScreenreaderTitle,
} from '../..'
import { Back, NavMenu } from '../../buttons'
import CateringAutocomplete from './CateringAutocomplete'

const CateringView = styled.div`
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const CateringContent = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  position: relative;
  z-index: 2;
`

const CateringError = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  margin: -3rem 0 0;

  & > p {
    width: 100%;
    margin: 0 0 3rem;
  }
`

const CateringButtons = styled.div`
  margin: 2rem 0 0;

  button {
    margin: 0 1rem 0 0;
  }
`

const CateingContent = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const CateringStartOver = styled.div`
  margin: 3rem 0 0;

  button {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CateringPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const hasCatering = useSelector(selectHasCatering)
  const cateringOnly = useSelector(selectCateringOnly)
  const { catering: config, guest } = useSelector(selectContent)
  const { showGuest } = guest || {}
  const showGuestHeader = !showGuest && cateringOnly
  const { title, subtitle, background, content } = config
  const { orderType, address } = useSelector(selectOrder)
  const hasContent = !!(content && content.length)

  useEffect(() => {
    if (!orderType) dispatch(setOrderType('CATERING'))
  }, [orderType, dispatch])

  const chooseServiceType = (serviceType) => {
    dispatch(setServiceType(serviceType))
    navigate('/locations')
  }

  const startOver = () => {
    dispatch(resetOrder())
    navigate(`/order-type`)
  }

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={background} />
      <Content maxWidth="76.8rem">
        {showGuestHeader ? (
          <HeaderGuest />
        ) : (
          <Header
            maxWidth="76.8rem"
            title={isMobile ? 'Order Catering' : null}
            left={<Back path="/order-type" />}
            right={<NavMenu />}
          />
        )}
        <Main>
          <ScreenreaderTitle>Catering</ScreenreaderTitle>
          <CateringView>
            <PageTitle
              title={title}
              subtitle={subtitle}
              style={{ textAlign: 'left', maxWidth: '100%' }}
            />
            {hasCatering ? (
              <CateringContent>
                <CateringAutocomplete />
                <CateringButtons>
                  <ButtonStyled
                    onClick={() => chooseServiceType('DELIVERY')}
                    disabled={!address}
                    size={isMobile ? 'small' : 'default'}
                  >
                    Order Delivery
                  </ButtonStyled>
                  <ButtonStyled
                    onClick={() => chooseServiceType('PICKUP')}
                    disabled={!address}
                    size={isMobile ? 'small' : 'default'}
                    color="secondary"
                  >
                    Order Pickup
                  </ButtonStyled>
                </CateringButtons>
                {!cateringOnly && (
                  <CateringStartOver>
                    <ButtonLink onClick={startOver}>
                      Switch to a regular Pickup or Delivery order
                    </ButtonLink>
                  </CateringStartOver>
                )}
              </CateringContent>
            ) : (
              <CateringError>
                <Message color="alert" as="p">
                  This merchant isn't currently accepting catering orders.
                </Message>
                <ButtonStyled onClick={startOver}>Start Over</ButtonStyled>
              </CateringError>
            )}
            {hasContent && (
              <CateingContent>
                <HtmlContent content={content} />
              </CateingContent>
            )}
          </CateringView>
        </Main>
      </Content>
    </>
  )
}

CateringPage.displayName = 'CateringPage'
export default CateringPage
