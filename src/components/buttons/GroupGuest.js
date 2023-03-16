import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeReadableDateStrFromIso } from '@open-tender/js'
import {
  selectGroupOrder,
  selectTimezone,
  selectCartTotal,
  selectMessages,
  addMessage,
  resetMessages,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { ShoppingBag } from '../icons'

const GroupGuest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tz = useSelector(selectTimezone)
  const { cartGuest, cutoffAt, spendingLimit } = useSelector(selectGroupOrder)
  const limit = spendingLimit ? parseFloat(spendingLimit) : null
  const cartTotal = useSelector(selectCartTotal)
  const messages = useSelector(selectMessages)
  const aboveLimit = limit && cartTotal > limit
  const cutoffTime =
    cutoffAt && tz ? makeReadableDateStrFromIso(cutoffAt, tz) : null
  const text = cutoffTime ? `Submit by ${cutoffTime}` : 'Submit'

  const onClick = () => {
    if (cartTotal === 0) {
      const msg = `Your cart is currently empty. Please add some items to your order.`
      const current = messages.find((i) => i.message === msg)
      if (!current) dispatch(addMessage(msg))
    } else if (aboveLimit) {
      const msg = `Above spending limit of $${spendingLimit}`
      const current = messages.find((i) => i.message === msg)
      if (!current) dispatch(addMessage(msg))
    } else {
      dispatch(resetMessages())
      navigate('/review')
    }
  }

  if (!cartGuest) return null

  return (
    <ButtonStyled
      icon={<ShoppingBag />}
      onClick={onClick}
      color="header"
      size="header"
    >
      {text}
    </ButtonStyled>
  )
}

GroupGuest.displayName = 'GroupGuest'
GroupGuest.propTypes = {}

export default GroupGuest
