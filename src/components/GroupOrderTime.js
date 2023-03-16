import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectGroupOrder,
  selectGroupOrderPrepTimes,
  selectOrder,
  selectTimezone,
} from '@open-tender/redux'
import { makeGroupOrderTimeStr } from '@open-tender/js'
import { Body, ButtonLink } from '@open-tender/components'

import { openModal } from '../slices'

const GroupOrderTimeView = styled.div`
  & > p + p {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const GroupOrderTime = () => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter, serviceType, orderType } =
    useSelector(selectOrder)
  const tz = useSelector(selectTimezone)
  const { order_times } = revenueCenter || {}
  const orderTimes = order_times ? order_times[serviceType] : null
  const { cutoffAt } = useSelector(selectGroupOrder)
  const orderTime = makeGroupOrderTimeStr(requestedAt, tz)
  const cutoffTime = makeGroupOrderTimeStr(cutoffAt, tz)
  const { prepTime } = useSelector(selectGroupOrderPrepTimes)
  const args = {
    focusFirst: true,
    skipClose: true,
    style: orderTimes ? { alignItems: 'flex-start' } : {},
    revenueCenter,
    serviceType,
    orderType,
    requestedAt,
  }

  const adjustTime = () => {
    dispatch(openModal({ type: 'requestedAt', args }))
  }

  return (
    <GroupOrderTimeView>
      <Body as="p">
        {orderTime === 'ASAP'
          ? `Please note that this group order is currently scheduled for ASAP and will be ready about ${prepTime} minutes from the time it gets submitted.`
          : `Please note that this order must be submitted by ${cutoffTime} in order to
      be ready by the scheduled time of ${orderTime}.`}{' '}
      </Body>
      <Body as="p">
        <ButtonLink onClick={adjustTime}>Choose a different time</ButtonLink>
      </Body>
    </GroupOrderTimeView>
  )
}

GroupOrderTime.displayName = 'GroupOrderTime'
export default GroupOrderTime
