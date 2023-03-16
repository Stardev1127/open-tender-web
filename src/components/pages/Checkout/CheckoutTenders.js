import { useCallback, useMemo, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { checkAmountRemaining, isString, updateTenders } from '@open-tender/js'
import { selectCheckout, selectCustomer, updateForm } from '@open-tender/redux'
import { FormError } from '@open-tender/components'

import { selectContent } from '../../../slices'
import CheckoutSection from './CheckoutSection'
import CheckoutCreditCards from './CheckoutCreditCards'
import CheckoutHouseAccounts from './CheckoutHouseAccounts'
import CheckoutGuestCreditCard from './CheckoutGuestCreditCard'
import CheckoutPay from './CheckoutPay'
import CheckoutCreditCardAdd from './CheckoutCreditCardAdd'
import CheckoutLevelUp from './CheckoutLevelUp'

const CheckoutTendersView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutTendersErrors = styled.div`
  margin: 0 0 1.5rem;
`

const makeTenderErrors = (errors) => {
  if (!errors) return []
  const tenderErrors = errors ? Object.values(errors) : []
  return tenderErrors.reduce((arr, i) => {
    return isString(i) ? arr.concat([i]) : arr.concat(Object.values(i))
  }, [])
}

const CheckoutTenders = () => {
  const dispatch = useDispatch()
  const [hasTender, setHasTender] = useState(false)
  const { checkout: config } = useSelector(selectContent)
  const { auth } = useSelector(selectCustomer)
  const { check, form, errors } = useSelector(selectCheckout)
  const total = check.totals ? check.totals.total : 0.0
  const amount = checkAmountRemaining(total, form.tenders).toFixed(2)
  const isPaid = amount === '0.00'
  const tenderErrors = makeTenderErrors(errors.tenders)
  const hasErrors = tenderErrors.length > 0
  const giftTenders = useMemo(
    () => form.tenders.filter((i) => i.tender_type === 'GIFT_CARD'),
    [form.tenders]
  )
  const cards = useMemo(
    () => (check.customer ? check.customer.credit_cards : []),
    [check.customer]
  )
  const hasCards = cards && cards.length > 0
  const noTender = form.tenders.length === 0
  const customerCard = useMemo(
    () => (hasCards && noTender ? cards[0] : null),
    [hasCards, noTender, cards]
  )

  // useEffect(() => {
  //   return () => dispatch(updateForm({ tenders: [] }))
  // }, [dispatch])

  useEffect(() => {
    const tenders = updateTenders(form.tenders, total)
    if (tenders) {
      dispatch(updateForm({ tenders }))
    }
  }, [form.tenders, total, dispatch])

  // automatically apply first credit card if user has one
  useEffect(() => {
    setHasTender(true)
    if (customerCard && !hasTender) {
      const tender = { tender_type: 'CREDIT', amount, ...customerCard }
      dispatch(updateForm({ tenders: [tender] }))
    }
  }, [hasTender, customerCard, amount, dispatch])

  const apply = useCallback(
    (data, swap) => {
      if (parseFloat(amount) > 0 || swap) {
        const tender = { tender_type: 'CREDIT', amount, ...data }
        dispatch(updateForm({ tenders: [...giftTenders, tender] }))
      }
    },
    [dispatch, amount, giftTenders]
  )

  const remove = () => {
    dispatch(updateForm({ tenders: giftTenders }))
  }

  return (
    <CheckoutSection title={config.tenders.title}>
      <CheckoutTendersView>
        {hasErrors && (
          <CheckoutTendersErrors>
            {tenderErrors.map((errMsg, index) => (
              <FormError key={`${index}-${errMsg}`} errMsg={errMsg} />
            ))}
          </CheckoutTendersErrors>
        )}
        <CheckoutPay />
        <CheckoutLevelUp apply={apply} remove={remove} isPaid={isPaid} />
        {auth ? (
          <>
            <CheckoutCreditCards
              apply={apply}
              remove={remove}
              isPaid={isPaid}
            />
            <CheckoutCreditCardAdd isPaid={isPaid} />
            <CheckoutHouseAccounts
              apply={apply}
              remove={remove}
              isPaid={isPaid}
            />
          </>
        ) : (
          <CheckoutGuestCreditCard />
        )}
      </CheckoutTendersView>
    </CheckoutSection>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'
CheckoutTenders.propTypes = {}

export default CheckoutTenders
