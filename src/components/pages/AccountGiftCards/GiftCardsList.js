import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { removeCustomerGiftCard } from '@open-tender/redux'
import { formatDateStr, dateStrToDate } from '@open-tender/js'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { openModal, selectBrand } from '../../../slices'
import { LinkSeparator, QRCode, Row } from '../..'

const GiftCardButton = styled('button')`
  width: 8rem;
`

const GiftCardsList = ({ giftCards, isLoading }) => {
  const dispatch = useDispatch()
  const { has_pos } = useSelector(selectBrand)

  const handleAddValue = (giftCard) => {
    dispatch(openModal({ type: 'giftCard', args: { giftCard } }))
  }

  const handleAssign = (giftCardId) => {
    dispatch(openModal({ type: 'giftCardAssignOther', args: { giftCardId } }))
  }

  const handleDelete = (giftCard) => {
    const giftCardId = giftCard.gift_card_id
    dispatch(removeCustomerGiftCard(giftCardId))
  }

  const expand = (evt, src, alt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!src) return
    const title = alt
    const alert = 'QR codes are for in-store use only'
    const footnote =
      'To use online, simply apply this gift card on the checkout page'
    dispatch(
      openModal({ type: 'qrCode', args: { src, alt, title, alert, footnote } })
    )
  }

  return (
    <div>
      {giftCards.map((giftCard) => {
        const expired = dateStrToDate(giftCard.expiration) < new Date()
        const removeable = expired || giftCard.balance === '0.00'
        const src = giftCard.qr_code_url
        const alt = `Gift Card ${giftCard.card_number}`
        const icon =
          has_pos && src ? (
            <GiftCardButton onClick={(evt) => expand(evt, src, alt)}>
              <QRCode src={src} alt={alt} />
            </GiftCardButton>
          ) : null
        return (
          <Row
            key={giftCard.card_number}
            icon={icon}
            content={
              <>
                <p className="title">{giftCard.card_number}</p>
                <p>${giftCard.balance} remaining balance</p>
                {giftCard.expiration && (
                  <p>
                    {expired ? 'Expired ' : 'Expires '}
                    {formatDateStr(giftCard.expiration, 'MMM d, yyyy')}
                  </p>
                )}
                <p>
                  <ButtonLink
                    onClick={() => handleAssign(giftCard.gift_card_id)}
                    disabled={isLoading}
                  >
                    Assign to someone else
                  </ButtonLink>
                  {removeable && (
                    <>
                      <LinkSeparator />
                      <ButtonLink
                        onClick={() => handleDelete(giftCard)}
                        disabled={isLoading}
                      >
                        remove
                      </ButtonLink>
                    </>
                  )}
                </p>
              </>
            }
            actions={
              !expired ? (
                <ButtonStyled
                  onClick={() => handleAddValue(giftCard)}
                  size="small"
                  disabled={isLoading}
                >
                  Add Value
                </ButtonStyled>
              ) : null
            }
          ></Row>
        )
      })}
    </div>
  )
}

GiftCardsList.displayName = 'GiftCardsList'
GiftCardsList.propTypes = {
  giftCards: propTypes.array,
  isLoading: propTypes.bool,
}

export default GiftCardsList
