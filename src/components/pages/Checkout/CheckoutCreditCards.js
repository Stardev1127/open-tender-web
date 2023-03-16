import { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import CheckoutButton from './CheckoutButton'
import { cardIconsMapWidth } from '../../cardIcons'

const CheckoutCreditCardsView = styled.div``

const CheckoutCreditCards = ({ apply, remove, isPaid }) => {
  const { check, form } = useSelector(selectCheckout)
  const cards = useMemo(
    () => (check.customer ? check.customer.credit_cards || [] : []),
    [check.customer]
  )
  const [cardCount, setCardCount] = useState(cards.length)
  const hasCards = cards && cards.length > 0
  const appliedCard = form.tenders.find((i) => i.customer_card_id) || {}
  const appliedCardId = appliedCard.customer_card_id || null
  const defaultCard = useMemo(() => cards.find((i) => i.is_default), [cards])
  const defaultCardId = defaultCard ? defaultCard.customer_card_id : null
  const cardIds = cards.map((i) => i.customer_card_id)
  const missingCard = appliedCardId && !cardIds.includes(appliedCardId)

  // if customer adds new default card, replace the current credit tender
  useEffect(() => {
    if (cards.length > cardCount) {
      setCardCount(cards.length)
      if (defaultCardId && appliedCardId !== defaultCardId) {
        const card = { tender_type: 'CREDIT', ...defaultCard }
        apply(card, true)
      }
    }
  }, [
    appliedCardId,
    defaultCardId,
    defaultCard,
    apply,
    cardCount,
    cards.length,
  ])

  useEffect(() => {
    if (missingCard) remove()
  }, [missingCard, remove])

  if (!hasCards) return null

  return (
    <CheckoutCreditCardsView>
      {cards.map((card) => {
        const {
          card_type_name,
          card_type,
          last4,
          customer_card_id,
          is_default,
        } = card
        const title = `${card_type_name} - ${last4}`
        const isApplied = customer_card_id === appliedCard.customer_card_id
        const subtitle = isApplied
          ? `${formatDollars(appliedCard.amount)} applied to check`
          : is_default
          ? 'Default Card'
          : null
        const disabled = isPaid && !isApplied
        const tender = { tender_type: 'CREDIT', ...card }
        const onPress = isApplied ? () => remove() : () => apply(tender)
        return (
          <CheckoutButton
            key={customer_card_id}
            icon={cardIconsMapWidth[card_type]}
            title={title}
            subtitle={subtitle}
            onPress={onPress}
            isApplied={isApplied}
            disabled={disabled}
          />
        )
      })}
    </CheckoutCreditCardsView>
  )
}

CheckoutCreditCards.displayName = 'CheckoutCreditCards'
CheckoutCreditCards.propTypes = {
  apply: propTypes.func,
  remove: propTypes.func,
  isPaid: propTypes.bool,
}

export default CheckoutCreditCards
