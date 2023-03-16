import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectOrder,
  selectGroupOrder,
  addCustomerGroupOrder,
} from '@open-tender/redux'
import { makeGroupOrderTime } from '@open-tender/js'
import { Body, ButtonLink, ButtonStyled, Input } from '@open-tender/components'

import { openModal, closeModal } from '../../../slices'
import GroupOrderSteps from './GroupOrderSteps'
import { ModalContent } from '../../Modal'

const formatOrderTime = (s) => {
  return s ? s.replace('Today', 'today').replace('Tomorrow', 'tomorrow') : ''
}

const GroupOrderSummary = styled.div`
  & > p + p {
    margin: 0 0 1.5em;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const SpendingLimitForm = styled('form')`
  margin: 0;

  label {
    padding: 0;

    span span:first-of-type {
      width: auto;
      flex-grow: 1;
    }

    span span:last-of-type {
      flex-grow: 0;
      input {
        width: 12rem;
        text-align: right;
        @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
          width: 100%;
          text-align: left;
        }
      }
    }
  }
`

const GroupOrderStart = () => {
  const [orderTime, setOrderTime] = useState(null)
  const [spendingLimit, setSpendingLimit] = useState(null)
  // const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter, serviceType, orderType } =
    useSelector(selectOrder)
  const { order_times } = revenueCenter || {}
  const orderTimes = order_times ? order_times[serviceType] : null
  const args = {
    focusFirst: true,
    skipClose: true,
    isGroupOrder: true,
    style: orderTimes ? { alignItems: 'flex-start' } : {},
    revenueCenter,
    serviceType,
    orderType,
    requestedAt,
  }
  const { loading } = useSelector(selectGroupOrder)
  const isLoading = loading === 'pending'

  useEffect(() => {
    const groupOrderTime = makeGroupOrderTime(
      revenueCenter,
      serviceType,
      requestedAt
    )
    setOrderTime(groupOrderTime)
  }, [revenueCenter, serviceType, requestedAt])

  const adjust = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type: 'requestedAt', args }))
    }, 300)
  }

  const start = () => {
    const limit = isNaN(spendingLimit)
      ? null
      : parseFloat(spendingLimit).toFixed(2)
    const data = { spendingLimit: limit }
    dispatch(addCustomerGroupOrder(data))
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  const handleSpendingLimit = (evt) => {
    const { value } = evt.target
    setSpendingLimit(value ? Math.abs(value) : null)
  }

  return (
    <ModalContent
      title="Start a group order"
      subtitle={
        <p>Please confirm your order date & time before you share your cart</p>
      }
      footer={
        <div>
          <ButtonStyled onClick={start} color="primary" disabled={isLoading}>
            {isLoading ? 'Starting Group Order...' : 'Start a Group Order'}
          </ButtonStyled>
          <ButtonStyled color="secondary" onClick={cancel}>
            Nevermind
          </ButtonStyled>
        </div>
      }
    >
      {orderTime && (
        <>
          {orderTime.prepTime ? (
            <GroupOrderSummary>
              <Body as="p">
                The current wait time for group orders is {orderTime.prepTime}{' '}
                minutes from the time the order is submitted.{' '}
              </Body>
              <Body as="p">
                <ButtonLink onClick={adjust}>
                  Choose a specific order time
                </ButtonLink>
              </Body>
            </GroupOrderSummary>
          ) : (
            <GroupOrderSummary>
              <Body as="p">
                {orderTime.isAdjusted
                  ? 'The first available group order time is'
                  : 'Your currently selected group order time is'}{' '}
                {formatOrderTime(orderTime.dateStr)}, which means that all
                orders must be submitted by{' '}
                {formatOrderTime(orderTime.cutoffDateStr)}.
              </Body>
              <Body as="p">
                <ButtonLink onClick={adjust}>
                  Choose a different time
                </ButtonLink>
              </Body>
            </GroupOrderSummary>
          )}
        </>
      )}
      <SpendingLimitForm noValidate>
        <Input
          label="Set a guest spending Limit (optional)"
          name="spending_limit"
          type="number"
          value={spendingLimit || ''}
          onChange={handleSpendingLimit}
          error={null}
        />
      </SpendingLimitForm>
      <GroupOrderSteps />
    </ModalContent>
  )
}

GroupOrderStart.displayName = 'GroupOrderStart'

export default GroupOrderStart
