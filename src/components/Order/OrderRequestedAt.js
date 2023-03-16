import propTypes from 'prop-types'
import { timezoneMap, makeRequestedAtStr } from '@open-tender/js'

const OrderRequestedAt = ({
  estimated_at,
  requested_time,
  timezone,
  is_asap,
  status,
}) => {
  const tz = timezone && timezoneMap[timezone]
  let estimatedAt = estimated_at && makeRequestedAtStr(estimated_at, tz, true)
  let msg = '(give or take a few minutes)'
  if (requested_time && requested_time.includes('-')) {
    const [dateStr] = estimatedAt.split('@')
    if (dateStr) estimatedAt = `${dateStr} @ ${requested_time.toLowerCase()}`
    msg = ''
  }
  return is_asap && status === 'OPEN' ? (
    <>
      <p>ASAP</p>
      <p>
        {estimatedAt} {msg}
      </p>
    </>
  ) : (
    <p>{estimatedAt}</p>
  )
}

OrderRequestedAt.displayName = 'OrderRequestedAt'
OrderRequestedAt.propTypes = {
  estimated_at: propTypes.string,
  requested_time: propTypes.string,
  timezone: propTypes.string,
  is_asap: propTypes.bool,
  status: propTypes.string,
}

export default OrderRequestedAt
