import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerAddresses,
  updateCustomerAddress,
  resetCustomerAddressesError,
} from '@open-tender/redux'
import { AddressForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const Address = ({ windowRef, address }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerAddresses)
  const update = useCallback(
    (id, data, callback) => dispatch(updateCustomerAddress(id, data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerAddressesError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent title="Update this address">
        <AddressForm
          address={address}
          loading={loading}
          error={error}
          update={update}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

Address.displayName = 'Address'
Address.propTypes = {
  address: propTypes.object,
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default Address
