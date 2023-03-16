import React, { useEffect, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerCreditCardsForPayment,
  selectCustomerGiftCards,
  updateCustomerGiftCard,
  addCustomerGiftCard,
  resetCustomerGiftCardsError,
} from '@open-tender/redux'
import { GiftCardForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const GiftCard = ({ windowRef, giftCard }) => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(selectCustomerGiftCards)
  const creditCards = useSelector(selectCustomerCreditCardsForPayment)
  const update = useCallback(
    (id, data, callback) =>
      dispatch(updateCustomerGiftCard(id, data, callback)),
    [dispatch]
  )
  const add = useCallback(
    (data, callback) => dispatch(addCustomerGiftCard(data, callback)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  useEffect(() => {
    return () => dispatch(resetCustomerGiftCardsError())
  }, [dispatch])

  useEffect(() => {
    if (error) windowRef.current.scrollTop = 0
  }, [error, windowRef])

  return (
    <ModalView>
      <ModalContent
        title={
          giftCard
            ? `Add value to gift card ${giftCard.card_number}`
            : 'Purchase a new gift card'
        }
      >
        {!creditCards || !creditCards.length ? (
          <p>
            Please save a credit card to your account before purchasing a gift
            card.
          </p>
        ) : (
          <GiftCardForm
            giftCard={giftCard}
            creditCards={creditCards}
            loading={loading}
            error={error}
            update={update}
            add={add}
            callback={callback}
          />
        )}
      </ModalContent>
    </ModalView>
  )
}

GiftCard.displayName = 'GiftCard'
GiftCard.propTypes = {
  giftCard: propTypes.object,
  windowRef: propTypes.shape({ current: propTypes.any }),
}

export default GiftCard
