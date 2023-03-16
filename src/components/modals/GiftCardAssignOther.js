import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerGiftCards,
  assignCustomerGiftCardOther,
  resetCustomerGiftCardsError,
} from '@open-tender/redux'
import { GiftCardAssignOtherForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const GiftCardAssignOther = ({ windowRef, giftCardId }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerGiftCards)
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])
  const assign = useCallback(
    (giftCardId, email, callback) =>
      dispatch(assignCustomerGiftCardOther(giftCardId, email, callback)),
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
        title="Assign gift card to a friend"
        subtitle={
          <p>
            Enter the email address of the person to which you'd like to assign
            this gift card, and they'll receive an email with the gift card
            number so they can use it to make a purchase online.
          </p>
        }
      >
        <GiftCardAssignOtherForm
          loading={loading}
          error={error}
          giftCardId={giftCardId}
          assign={assign}
          callback={callback}
        />
      </ModalContent>
    </ModalView>
  )
}

GiftCardAssignOther.displayName = 'GiftCardAssignOther'
GiftCardAssignOther.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
  giftCardId: propTypes.number,
}

export default GiftCardAssignOther
