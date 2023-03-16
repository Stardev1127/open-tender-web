import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { checkAmountRemaining } from '@open-tender/js'

import CheckoutApplePay from './CheckoutApplePay'
import CheckoutGooglePay from './CheckoutGooglePay'

const checkHasApplePay = (check) => {
  return check ? check.config.tender_types.includes('APPLE_PAY') : false
}

const checkHasGooglePay = (check) => {
  return check ? check.config.tender_types.includes('GOOGLE_PAY') : false
}

const CheckoutPayView = styled('div')`
  // max-width: 36rem;
  width: 100%;
  margin: 0 auto 3rem;
  text-align: center;
`

const CheckoutPay = () => {
  const dispatch = useDispatch()
  const { check, form, errors } = useSelector(selectCheckout)
  const tenderErrors = errors ? errors.tenders || null : null
  const tenderIndex = form.tenders.findIndex(
    (i) => i.tender_type !== 'GIFT_CARD'
  )
  const tenderError = tenderErrors ? tenderErrors[tenderIndex] : null
  const amount = checkAmountRemaining(check.totals.total, form.tenders).toFixed(
    2
  )

  // Apple Pay
  const hasApplePay = checkHasApplePay(check)
  const applePayError = tenderError ? tenderError.apple_pay || null : null

  // Google Pay
  const hasGooglePay = checkHasGooglePay(check)
  const googlePayError = tenderError ? tenderError.google_pay || null : null

  if (process.env.NODE_ENV !== 'development') {
    console.log('hasApplePay', hasApplePay, 'hasGooglePay', hasGooglePay)
  }

  const addTender = (tender) => {
    const newTender = { ...tender, amount }
    const currentTenders = form.tenders.filter(
      (i) => i.tender_type !== newTender.tender_type
    )
    dispatch(updateForm({ tenders: [...currentTenders, newTender] }))
  }

  const removeTender = (tenderType) => {
    const filtered = form.tenders.filter((i) => i.tender_type !== tenderType)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = nonGiftCard.map((i) => {
      const newAmount = remaining
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    dispatch(updateForm({ tenders: [...giftCard, ...nonZero] }))
  }

  if (!hasApplePay && !hasGooglePay) return null

  return (
    <CheckoutPayView>
      {hasApplePay && (
        <CheckoutApplePay
          amount={amount}
          error={applePayError}
          addTender={addTender}
          removeTender={removeTender}
        />
      )}
      {hasGooglePay && (
        <CheckoutGooglePay
          amount={amount}
          error={googlePayError}
          addTender={addTender}
          removeTender={removeTender}
        />
      )}
    </CheckoutPayView>
  )
}

CheckoutPay.displayName = 'CheckoutPay'

export default CheckoutPay
