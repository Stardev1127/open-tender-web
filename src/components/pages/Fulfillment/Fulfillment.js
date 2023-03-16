import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import { fetchOrderFulfillment } from '@open-tender/redux'

import { selectBrand, selectFulfillment } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Main,
  OrderFulfillment,
  PageContainer,
  PageContent,
} from '../..'

const Fulfillment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: orderId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const fulfillment = useSelector(selectFulfillment)

  useEffect(() => {
    if (!fulfillment) return navigate('/account')
  }, [fulfillment, navigate])

  useEffect(() => {
    dispatch(fetchOrderFulfillment(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <Helmet>
        <title>Curbside Pickup | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageContent>
              <OrderFulfillment orderId={orderId} />
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Fulfillment.displayName = 'Fulfillment'
export default Fulfillment
