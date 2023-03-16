import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectConfirmationOrder,
  resetCheckout,
  resetCompletedOrder,
  resetConfirmation,
  resetGroupOrder,
  resetOrder,
  resetOrderFulfillment,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectBrand, selectConfig, selectOptIns } from '../../../slices'
import {
  Content,
  Main,
  Order,
  OrderFulfillment,
  PageTitle,
  PageContent,
  HeaderDefault,
  PageContainer,
} from '../..'
import ConfirmationPrefs from './ConfirmationPrefs'
import ConfirmationLinks from './ConfirmationLinks'
import styled from '@emotion/styled'

const ConfirmationFooter = styled.div`
  display: flex;
  justify-content: center;
`

const Confirmation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPrefs, setShowPrefs] = useState(false)
  const { confirmation: config } = useSelector(selectConfig)
  const brand = useSelector(selectBrand)
  const order = useSelector(selectConfirmationOrder)
  const { order_fulfillment, order_id, revenue_center, service_type } =
    order || {}
  const { auth, profile } = useSelector(selectCustomer)
  const isNew = auth && profile && !profile.is_notification_set
  const optIns = useSelector(selectOptIns)
  const { accepts_marketing, order_notifications } = optIns
  const showOptIns = isNew && (accepts_marketing || order_notifications)
  const hasFulfillment =
    brand.fulfillment &&
    revenue_center &&
    revenue_center.has_order_fulfillment &&
    service_type === 'PICKUP'

  useEffect(() => {
    dispatch(resetCompletedOrder())
    dispatch(resetOrder())
    dispatch(resetCheckout())
    dispatch(resetGroupOrder())
    return () => {
      dispatch(resetConfirmation())
    }
  }, [dispatch])

  useEffect(() => {
    if (!order) navigate('/account')
  }, [order, navigate])

  useEffect(() => {
    if (!hasFulfillment) dispatch(resetOrderFulfillment())
  }, [hasFulfillment, dispatch])

  useEffect(() => {
    if (showOptIns) setShowPrefs(true)
  }, [showOptIns])

  return (
    <>
      <Helmet>
        <title>Confirmation | {brand.title}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle {...config}>
              <ConfirmationLinks auth={auth} brand={brand} />
            </PageTitle>
            <PageContent style={{ margin: '2.5rem auto' }}>
              {showPrefs && <ConfirmationPrefs />}
              {hasFulfillment && (
                <OrderFulfillment
                  orderId={order_id}
                  order_fulfillment={order_fulfillment}
                />
              )}
            </PageContent>
            <Order order={order} isConfirmation={true} />
            <ConfirmationFooter>
              <ButtonStyled onClick={() => navigate(`/account`)}>
                Back Home
              </ButtonStyled>
            </ConfirmationFooter>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Confirmation.displayName = 'Confirmation'
export default Confirmation
