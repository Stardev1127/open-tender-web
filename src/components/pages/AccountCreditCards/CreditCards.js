import React from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {
  updateCustomerCreditCard,
  removeCustomerCreditCard,
} from '@open-tender/redux'
import { Checkmark, ButtonLink, Preface } from '@open-tender/components'

import { cardIconsMap } from '../../cardIcons'
import { LinkSeparator, Row } from '../..'

const CreditCardIcon = styled('span')`
  display: block;
  width: 6rem;
  min-width: 6rem;
  // height: auto;
`

const CreditCards = ({ creditCards, isLoading, showDefault = true }) => {
  const dispatch = useDispatch()

  const handleDefault = (creditCard) => {
    const cardId = creditCard.customer_card_id
    const data = { is_default: true }
    dispatch(updateCustomerCreditCard(cardId, data))
  }

  const handleDelete = (creditCard) => {
    const cardId = creditCard.customer_card_id
    dispatch(removeCustomerCreditCard(cardId))
  }

  return (
    <div>
      {creditCards.map((creditCard) => (
        <Row
          key={creditCard.customer_card_id}
          icon={
            <CreditCardIcon>
              {cardIconsMap[creditCard.card_type]}
            </CreditCardIcon>
          }
          content={
            <>
              {creditCard.is_default && (
                <Preface
                  size="xSmall"
                  style={{
                    display: 'inline-block',
                    margin: '0 1.0rem 0.3rem 0',
                  }}
                >
                  Primary
                </Preface>
              )}
              <p className="title">
                {creditCard.card_type_name} ending in {creditCard.last4}
                {creditCard.is_default && (
                  <span style={{ paddingLeft: '0.5rem' }}>
                    <Checkmark />
                  </span>
                )}
              </p>
              <p>{creditCard.masked}</p>
              <p>
                {showDefault && (
                  <>
                    <ButtonLink
                      onClick={() => handleDefault(creditCard)}
                      disabled={creditCard.is_default || isLoading}
                    >
                      make primary
                    </ButtonLink>
                    <LinkSeparator />
                  </>
                )}

                <ButtonLink
                  onClick={() => handleDelete(creditCard)}
                  disabled={isLoading}
                >
                  remove
                </ButtonLink>
              </p>
            </>
          }
        />
      ))}
    </div>
  )
}

CreditCards.displayName = 'CreditCards'
CreditCards.propTypes = {
  creditCards: propTypes.array,
  isLoading: propTypes.bool,
  showDefault: propTypes.bool,
}

export default CreditCards
