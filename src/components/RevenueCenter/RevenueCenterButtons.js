import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import {
  setOrderServiceType,
  setAddress,
  setRevenueCenter,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../../slices'

export const RevenueCenterButtons = ({ revenueCenter }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    name,
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
  } = revenueCenter
  const settings = revenueCenter.settings || revenueCenter
  const { first_times: ft, order_times: ot } = settings
  const menuSlug = `/menu/${slug}`
  const serviceTypes = ['PICKUP', 'DELIVERY']
  const hasPickup =
    ((ft && ft.PICKUP) || (ot && ot.PICKUP)) && serviceTypes.includes('PICKUP')
  const hasWalkin =
    ((ft && ft.PICKUP) || (ot && ot.PICKUP)) && serviceTypes.includes('WALKIN')
  const hasDelivery =
    ((ft && ft.DELIVERY) || (ot && ot.DELIVERY)) &&
    serviceTypes.includes('DELIVERY')

  const handleWalkin = () => {
    dispatch(setOrderServiceType(rcType, 'WALKIN', false))
    dispatch(setRevenueCenter(revenueCenter))
    navigate(menuSlug)
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType(rcType, 'PICKUP', isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    dispatch(setRevenueCenter(revenueCenter))
    navigate(menuSlug)
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType(rcType, 'DELIVERY', isOutpost))
    if (isOutpost) {
      dispatch(setAddress(address))
      dispatch(setRevenueCenter(revenueCenter))
      navigate(menuSlug)
    } else {
      dispatch(setAddress(null))
      dispatch(setRevenueCenter(revenueCenter))
      dispatch(openModal({ type: 'mapsAutocomplete' }))
    }
  }

  return (
    <>
      {hasWalkin && (
        <ButtonStyled
          label={`Order Dine-in from ${name}`}
          onClick={handleWalkin}
          size={isMobileOnly ? 'small' : 'default'}
        >
          Order {hasDelivery ? 'Dine-in' : 'Here'}
        </ButtonStyled>
      )}
      {hasPickup && (
        <ButtonStyled
          label={`Order Pickup from ${name}`}
          onClick={handlePickup}
          size={isMobileOnly ? 'small' : 'default'}
        >
          Order {hasDelivery ? 'Pickup' : 'Here'}
        </ButtonStyled>
      )}
      {hasDelivery && (
        <ButtonStyled
          label={`Order Delivery from ${name}`}
          onClick={handleDelivery}
          size={isMobileOnly ? 'small' : 'default'}
        >
          Order Delivery
        </ButtonStyled>
      )}
    </>
  )
}

RevenueCenterButtons.displayName = 'RevenueCenterButtons'
RevenueCenterButtons.propTypes = {
  revenueCenter: propTypes.object,
}

export default RevenueCenterButtons
