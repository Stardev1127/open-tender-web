import { useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import debounce from 'lodash/debounce'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, updateForm } from '@open-tender/redux'
import {
  capitalize,
  checkAmountRemaining,
  validateCreditCard,
} from '@open-tender/js'
import { CreditCard, useCreditCard } from '@open-tender/components'
import { cardIconsMap } from '../../cardIcons'

const CheckoutGuestCreditCardView = styled('div')`
  margin: 1.5rem 0 0;
`

const CheckoutGuestCreditCard = () => {
  const dispatch = useDispatch()
  const { check, form, errors: checkoutErrors } = useSelector(selectCheckout)
  const card = form.tenders.find((i) => i.tender_type === 'CREDIT')
  const cardErrors = checkoutErrors.tenders ? checkoutErrors.tenders[0] : {}
  const { acct, exp, cvv, zip } = cardErrors || {}
  const {
    data,
    cardType,
    errors,
    setErrors,
    disabled,
    handleChange,
    handleBlur,
  } = useCreditCard(card, cardErrors)
  const total = check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, []).toFixed(2)
  const hasAmount = amount ? parseFloat(amount) > 0 : false

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((tenders) => dispatch(updateForm({ tenders })), 500),
    [dispatch]
  )

  useEffect(() => {
    if (hasAmount) {
      const { card: cc, errors: ccErrors } = validateCreditCard(data, cardType)
      if (cc.acct && cc.exp && cc.cvv && cc.zip && !ccErrors) {
        const card_type_name = capitalize(cardType)
        const last4 = cc.acct.slice(-4)
        const tender = {
          tender_type: 'CREDIT',
          amount,
          card_type_name,
          last4,
          ...cc,
        }
        debouncedUpdate([tender])
      } else {
        debouncedUpdate([])
      }
    }
  }, [data, cardType, amount, hasAmount, debouncedUpdate, setErrors])

  useEffect(() => {
    if (acct || exp || cvv || zip) {
      let ccErrors = {}
      if (acct) ccErrors = { ...ccErrors, acct }
      if (exp) ccErrors = { ...ccErrors, exp }
      if (cvv) ccErrors = { ...ccErrors, cvv }
      if (zip) ccErrors = { ...ccErrors, zip }
      setErrors(ccErrors)
    }
  }, [setErrors, acct, exp, cvv, zip])

  return (
    <CheckoutGuestCreditCardView>
      <CreditCard
        data={data}
        cardType={cardType}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
        disabled={disabled}
        cardIconMap={cardIconsMap}
      />
    </CheckoutGuestCreditCardView>
  )
}

CheckoutGuestCreditCard.displayName = 'CheckoutGuestCreditCard'
CheckoutGuestCreditCard.propTypes = {}

export default CheckoutGuestCreditCard
