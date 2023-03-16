import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  fetchLocation,
  resetOrderType,
  selectMenuSlug,
  selectOrder,
  setOrderServiceType,
  setPrepType,
  setRequestedAt,
  setTable,
} from '@open-tender/redux'
import { Body, ButtonStyled, Text } from '@open-tender/components'

import { selectBrand } from '../../../slices'
import { NavMenu } from '../../buttons'
import {
  Content,
  Header,
  HeaderLogo,
  Main,
  PageContainer,
  PageContent,
  Loading,
} from '../..'

const QRView = styled.div``

const QRHeader = styled.div`
  text-align: center;

  h1 {
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizesMobile.xBig};
    }
  }

  h1 span {
    display: block;
  }

  p {
    margin: 1rem 0 0;
  }
`

const QRButtons = styled.div`
  label: QRButtons;
  margin: 3rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const notFoundMsg =
  "Sorry, but we couldn't find this location. Please try again"

const validPrepTypes = ['EAT_HERE', 'TAKE_OUT']

const makePrepType = (prepType) => {
  if (!prepType) return null
  const upper = prepType.toUpperCase()
  return validPrepTypes.includes(upper) ? upper : null
}

const QR = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [init, setInit] = useState(false)
  const { id: locationId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { prepType, revenueCenter, loading, error } = order
  const { revenue_center_type: orderType, name } = revenueCenter || {}
  const isLoading = loading === 'pending'
  const errMsg = error && error.includes('exist') ? notFoundMsg : error
  const query = new URLSearchParams(useLocation().search)
  const serviceType = query.get('service_type') || 'WALKIN'
  const table = query.get('table') || null
  const prep_type = query.get('prep_type') || null
  const presetPrepType = makePrepType(prep_type)

  useEffect(() => {
    dispatch(resetOrderType())
    dispatch(setPrepType(presetPrepType))
    dispatch(fetchLocation(locationId))
    setInit(true)
  }, [dispatch, presetPrepType, locationId])

  useEffect(() => {
    if (init && menuSlug !== '/' && prepType) {
      dispatch(setTable(table))
      dispatch(setRequestedAt('asap'))
      dispatch(setOrderServiceType(orderType, serviceType, false))
      navigate(menuSlug)
    }
  }, [
    init,
    prepType,
    menuSlug,
    orderType,
    serviceType,
    table,
    dispatch,
    navigate,
  ])

  return (
    <>
      <Helmet>
        <title>Dine In | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header left={<HeaderLogo />} right={<NavMenu />} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageContent>
              {isLoading ? (
                <Loading text="Loading menu..." />
              ) : errMsg ? (
                <Text color="error" style={{ width: '100%' }}>
                  {errMsg}
                </Text>
              ) : (
                <QRView>
                  <QRHeader>
                    {name ? (
                      <h1>
                        <span>Welcome to</span>
                        <span>{name}</span>
                      </h1>
                    ) : (
                      <h1>Welcome</h1>
                    )}
                    <Body as="p" size="main">
                      Please choose an order type
                    </Body>
                  </QRHeader>
                  <QRButtons>
                    <ButtonStyled
                      onClick={() => dispatch(setPrepType('EAT_HERE'))}
                      size="default"
                    >
                      Eat Here
                    </ButtonStyled>
                    <ButtonStyled
                      onClick={() => dispatch(setPrepType('TAKE_OUT'))}
                      size="default"
                    >
                      Take Out
                    </ButtonStyled>
                  </QRButtons>
                </QRView>
              )}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

QR.displayName = 'QR'
export default QR
