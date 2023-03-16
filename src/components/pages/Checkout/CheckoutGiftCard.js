import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  assignCustomerGiftCard,
  resetCustomerGiftCardsError,
  selectCustomerGiftCards,
  validateOrder,
} from '@open-tender/redux'
import { makeNumeric } from '@open-tender/js'
import { ButtonStyled, FormError, Input } from '@open-tender/components'

const PaymentGiftCardNew = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 0;
`

const PaymentGiftCardInput = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 2rem 0 0;
`

const PaymentGiftCardButton = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`

const makeErrMsg = (error) => {
  if (!error) return null
  return error.card_number || error.form
}

const PaymentGiftCard = () => {
  const dispatch = useDispatch()
  const [cardNumber, setCardNumber] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const callback = () => dispatch(validateOrder())
  const { loading, error: giftCardErr } = useSelector(selectCustomerGiftCards)
  const errMsg = makeErrMsg(giftCardErr)
  const disabled = submitting || !cardNumber ? true : false

  useEffect(() => {
    return () => dispatch(resetCustomerGiftCardsError())
  }, [dispatch])

  useEffect(() => {
    if (loading === 'idle' && submitting) {
      setSubmitting(false)
      if (!errMsg) setCardNumber('')
    }
  }, [loading, submitting, errMsg])

  useEffect(() => {
    if (errMsg) setError(errMsg)
  }, [errMsg])

  const handleChange = (evt) => {
    setError('')
    setCardNumber(makeNumeric(evt.target.value))
  }

  const applyCardNumber = () => {
    setSubmitting(true)
    dispatch(resetCustomerGiftCardsError())
    const cleanNumber = parseInt(makeNumeric(cardNumber))
    dispatch(assignCustomerGiftCard(cleanNumber, callback))
  }

  return (
    <>
      <PaymentGiftCardNew>
        <PaymentGiftCardInput>
          <Input
            label="Enter gift card number"
            value={cardNumber}
            onChange={handleChange}
            type="number"
            pattern="[0-9]*"
            style={{ margin: 0 }}
          />
        </PaymentGiftCardInput>
        <PaymentGiftCardButton>
          <ButtonStyled
            onClick={applyCardNumber}
            disabled={disabled}
            size="small"
            color="secondary"
          >
            {submitting ? 'Adding to Account...' : 'Add to Account'}
          </ButtonStyled>
        </PaymentGiftCardButton>
      </PaymentGiftCardNew>
      <FormError errMsg={error} />
    </>
  )
}

PaymentGiftCard.displayName = 'PaymentGiftCard'

export default PaymentGiftCard
