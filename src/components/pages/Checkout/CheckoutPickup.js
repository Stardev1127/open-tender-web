import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectOrder } from '@open-tender/redux'
import {
  makeRequestedAtStr,
  serviceTypeNamesMap,
  timezoneMap,
} from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'
import { openModal } from '../../../slices'
import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'
import CheckoutSectionTitle from './CheckoutSectionTitle'

const CheckoutPickup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderType, requestedAt, revenueCenter, serviceType, prepType } =
    useSelector(selectOrder)

  if (!revenueCenter) return null

  const { name, address, timezone, first_times } = revenueCenter || {}
  // const { street, city, state, postal_code } = address
  // const addressLine2 = `${city}, ${state} ${postal_code}`
  const firstTime = first_times ? first_times[serviceType] : {}
  const tz = timezone ? timezoneMap[timezone] : null
  const requestedTime = tz ? makeRequestedAtStr(requestedAt, tz, true) : null
  const isAsap = requestedTime === 'ASAP' && serviceType === 'PICKUP'
  const requestedTimeStr = isAsap ? 'Now' : requestedTime
  const waitTime = isAsap ? firstTime.wait_minutes || null : null
  let serviceTypeName = serviceTypeNamesMap[serviceType]
  serviceTypeName = prepType === 'TAKE_OUT' ? 'Take Out' : serviceTypeName

  const changeLocation = () => {
    navigate('/locations')
  }

  const adjustTime = () => {
    const args = {
      focusFirst: true,
      skipClose: true,
      revenueCenter,
      serviceType,
      orderType,
      requestedAt,
    }
    dispatch(openModal({ type: 'requestedAt', args }))
  }

  return (
    <CheckoutSection title="Location & Time">
      <CheckoutSectionTitle>{name}</CheckoutSectionTitle>
      <p>{address.street}</p>
      {/* <p>{addressLine2}</p> */}
      <p>
        {serviceTypeName} Time: {requestedTimeStr}
        {waitTime && <span> (about {waitTime} mins)</span>}
      </p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={changeLocation}>Change location</ButtonLink> or{' '}
          <ButtonLink onClick={adjustTime}>
            adjust {serviceTypeName.toLowerCase()} time
          </ButtonLink>
        </p>
      </CheckoutSectionFootnote>
    </CheckoutSection>
  )
}

CheckoutPickup.displayName = 'CheckoutPickup'
CheckoutPickup.propTypes = {}

export default CheckoutPickup
