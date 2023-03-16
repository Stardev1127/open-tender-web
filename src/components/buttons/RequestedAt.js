import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectGroupOrder,
  selectOrder,
  selectTimezone,
} from '@open-tender/redux'
import { makeRequestedAtStr } from '@open-tender/js'
import { openModal } from '../../slices'
import { Clock } from '../icons'
import { ButtonBoth } from '.'

const RequestedAt = ({ style = null, useButton = false }) => {
  const dispatch = useDispatch()
  const { requestedAt, revenueCenter, serviceType, orderType } =
    useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const tz = useSelector(selectTimezone)
  const requestedAtText = makeRequestedAtStr(requestedAt, tz)
  const { order_times } = revenueCenter || {}
  const orderTimes = order_times ? order_times[serviceType] : null
  const args = {
    focusFirst: true,
    skipClose: true,
    isGroupOrder: cartId ? true : false,
    style: orderTimes ? { alignItems: 'flex-start' } : {},
    revenueCenter,
    serviceType,
    orderType,
    requestedAt,
  }

  if (!revenueCenter || !requestedAt) return null

  return (
    <ButtonBoth
      text={requestedAtText}
      icon={<Clock />}
      onClick={() => dispatch(openModal({ type: 'requestedAt', args }))}
      style={style}
      useButton={useButton}
    />
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default RequestedAt
