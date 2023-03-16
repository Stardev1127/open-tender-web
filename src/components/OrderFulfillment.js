import React, { useCallback, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectOrderFulfillment,
  updateOrderFulfillment,
  resetOrderFulfillment,
} from '@open-tender/redux'
import { Message, OrderFulfillmentForm } from '@open-tender/components'

import { selectFulfillment } from '../slices'
import { FormSection, Loading } from '.'

const OrderFulfillmentView = styled.div`
  max-width: 54rem;
  margin: 4rem auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

const OrderFulfillment = ({ orderId, order_fulfillment = {} }) => {
  const dispatch = useDispatch()
  const fulfillmentSettings = useSelector(selectFulfillment)
  const { orderFulfillment, loading, error } = useSelector(
    selectOrderFulfillment
  )
  const fulfillment = orderFulfillment || order_fulfillment || {}
  const empty = Object.values(fulfillment).every((i) => !i)
  const arrivalInfo = fulfillmentSettings.fields.find(
    (i) => i.name === 'arrival_info'
  )
  const subtitle = empty
    ? fulfillmentSettings.description
    : arrivalInfo
    ? `Please submit your ${arrivalInfo.label.toLowerCase()} below to let us know when you've arrived`
    : 'Please let us know when you arrive'
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (orderId, data) => dispatch(updateOrderFulfillment(orderId, data)),
    [dispatch]
  )

  useEffect(() => {
    return () => dispatch(resetOrderFulfillment())
  }, [dispatch])

  return (
    <OrderFulfillmentView>
      <FormSection title={fulfillmentSettings.title} subtitle={subtitle}>
        {isLoading ? (
          <Loading text="Retrieving..." />
        ) : errMsg ? (
          <Message color="error" style={{ width: '100%' }}>
            {errMsg}
          </Message>
        ) : (
          <OrderFulfillmentForm
            orderId={orderId}
            fulfillment={fulfillment}
            loading={loading}
            error={error}
            update={update}
            settings={fulfillmentSettings}
          />
        )}
      </FormSection>
    </OrderFulfillmentView>
  )
}

OrderFulfillment.displayName = 'OrderFulfillment'
OrderFulfillment.propTypes = {
  orderId: propTypes.number,
  order_fulfillment: propTypes.object,
}

export default OrderFulfillment
