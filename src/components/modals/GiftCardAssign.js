import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerGiftCards,
  assignCustomerGiftCard,
  resetCustomerGiftCardsError,
} from '@open-tender/redux'
import { GiftCardAssignForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const GiftCardAssign = ({ windowRef, validate }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerGiftCards)
  const callback = useCallback(() => {
    if (validate) validate()
    dispatch(closeModal())
  }, [dispatch, validate])
  const assign = useCallback(
    (cardNumber, callback) =>
      dispatch(assignCustomerGiftCard(cardNumber, callback)),
    [dispatch]
  )

  useEffect(() => {
    return () => dispatch(resetCustomerGiftCardsError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title="Add gift card to your account"
        subtitle={
          <p>
            Have a gift card number from a physical gift card or gift card
            email? Enter it below to associate the card with your online
            account.
          </p>
        }
      >
        <GiftCardAssignForm
          loading={loading}
          error={error}
          assign={assign}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

GiftCardAssign.displayName = 'GiftCardAssign'
GiftCardAssign.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default GiftCardAssign
