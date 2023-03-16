import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  setServiceType,
  setRequestedAt,
  resetCart,
  resetMenuVars,
  resetRevenueCenter,
  fetchMenu,
} from '@open-tender/redux'
import {
  capitalize,
  makeReadableDateStrFromIso,
  timezoneMap,
} from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const AdjustRequestedAt = ({ firstTimes, revenueCenter }) => {
  const dispatch = useDispatch()
  const tz = timezoneMap[revenueCenter.timezone]
  const revenueCenterId = revenueCenter.revenue_center_id

  const handleUpdate = ({ serviceType, requestedAt }) => {
    dispatch(setServiceType(serviceType))
    dispatch(setRequestedAt(requestedAt))
    dispatch(resetCart())
    dispatch(resetMenuVars())
    dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
    dispatch(closeModal())
  }

  const changeLocation = () => {
    dispatch(resetRevenueCenter())
    dispatch(closeModal())
  }

  const [current, other] = firstTimes
  const m = makeReadableDateStrFromIso
  const currentStr = current
    ? `${capitalize(current.serviceType)} ${m(current.requestedAt, tz, true)}`
    : ''
  const otherStr = other
    ? `${capitalize(other.serviceType)} ${m(other.requestedAt, tz, true)}`
    : ''

  return (
    <ModalView>
      <ModalContent
        title="Order time not currently available"
        footer={
          <div>
            {current && (
              <ButtonStyled onClick={() => handleUpdate(current)}>
                {currentStr}
              </ButtonStyled>
            )}
            {other && (
              <ButtonStyled onClick={() => handleUpdate(other)}>
                {otherStr}
              </ButtonStyled>
            )}
            <ButtonStyled onClick={changeLocation}>
              Change Location
            </ButtonStyled>
          </div>
        }
      >
        <div>
          <p>
            This location can't accommodate your currently selected order time
            and service type. Please choose an option below.
          </p>
        </div>
      </ModalContent>
    </ModalView>
  )
}

AdjustRequestedAt.displayName = 'AdjustRequestedAt'
AdjustRequestedAt.propTypes = {
  firstTimes: propTypes.array,
  revenueCenter: propTypes.object,
}

export default AdjustRequestedAt
