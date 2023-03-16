import { useMemo } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, selectCustomer, updateForm } from '@open-tender/redux'
import { formatDollars, checkAmountRemaining } from '@open-tender/js'

import { selectContent } from '../../../slices'
import { cardIconsMap } from '../../cardIcons'
import CheckoutSection from './CheckoutSection'
import CheckoutButton from './CheckoutButton'
import CheckoutGiftCard from './CheckoutGiftCard'
import CheckoutGiftCardsGuest from './CheckoutGiftCardsGuest'

const CheckoutGiftCardsView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutGiftCards = () => {
  const dispatch = useDispatch()
  const { auth } = useSelector(selectCustomer)
  const { checkout: config } = useSelector(selectContent)
  const { check, form } = useSelector(selectCheckout)
  const giftCards =
    check.customer && check.customer.gift_cards
      ? check.customer.gift_cards || []
      : []
  const applied = useMemo(
    () =>
      form.tenders
        .filter((i) => i.tender_type === 'GIFT_CARD')
        .reduce((obj, i) => ({ ...obj, [i.card_number]: i.amount }), {}),
    [form.tenders]
  )
  const amountRemaining = checkAmountRemaining(check.totals.total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'

  const applyGiftCard = (cardNumber, balance) => {
    const giftCardTenders = form.tenders.filter(
      (i) => i.tender_type === 'GIFT_CARD'
    )
    let remaining = giftCardTenders.length
      ? checkAmountRemaining(check.totals.total, giftCardTenders)
      : parseFloat(check.totals.total)
    const amount = Math.min(remaining, parseFloat(balance)).toFixed(2)
    if (parseFloat(amount) <= 0.0) return
    const newGiftCard = {
      tender_type: 'GIFT_CARD',
      card_number: cardNumber,
      balance: balance,
      amount: amount,
    }
    dispatch(updateForm({ tenders: [...form.tenders, newGiftCard] }))
  }

  const removeGiftCard = (cardNumber) => {
    const filtered = form.tenders.filter((i) => i.card_number !== cardNumber)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = giftCard.map((i) => {
      const newAmount = Math.min(remaining, parseFloat(i.balance))
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    const adjustedOther = nonGiftCard.map((i) => {
      const newAmount = parseFloat(i.amount) + remaining
      remaining = 0.0
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZeroOther = adjustedOther.filter((i) => i.amount !== '0.00')
    dispatch(updateForm({ tenders: [...nonZeroOther, ...nonZero] }))
  }

  return (
    <CheckoutSection title={config.giftCards.title}>
      <CheckoutGiftCardsView>
        {!auth ? (
          <CheckoutGiftCardsGuest />
        ) : (
          <>
            {giftCards.map((i) => {
              const amount = applied[i.card_number]
              const isApplied = !!amount
              const onPress = isApplied
                ? () => removeGiftCard(i.card_number)
                : () => applyGiftCard(i.card_number, i.balance)
              const disabled = !isApplied && isPaid
              const title = `Gift Card ${i.card_number}`
              const subtitle = isApplied
                ? `${formatDollars(amount)} applied to check`
                : `${formatDollars(i.balance)} available`
              return (
                <CheckoutButton
                  key={i.card_number}
                  icon={cardIconsMap['OTHER']}
                  title={title}
                  subtitle={subtitle}
                  onPress={onPress}
                  isApplied={isApplied}
                  disabled={disabled}
                />
              )
            })}
            <CheckoutGiftCard />
          </>
        )}
      </CheckoutGiftCardsView>
    </CheckoutSection>
  )
}

CheckoutGiftCards.displayName = 'CheckoutGiftCards'

export default CheckoutGiftCards
