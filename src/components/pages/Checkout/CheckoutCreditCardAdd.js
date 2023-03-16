import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, validateOrder } from '@open-tender/redux'

import { openModal } from '../../../slices'
import { cardIconsMapWidth } from '../../cardIcons'
import CheckoutButton from './CheckoutButton'

const CheckoutCreditCardAdd = ({ isPaid }) => {
  const dispatch = useDispatch()
  const { revenueCenter } = useSelector(selectOrder)
  const { revenue_center_id = null } = revenueCenter || {}

  const onClick = (evt) => {
    evt.preventDefault()
    const args = {
      callback: () => dispatch(validateOrder()),
      revenue_center_id,
    }
    dispatch(openModal({ type: 'creditCard', args }))
  }

  return (
    <CheckoutButton
      icon={cardIconsMapWidth['OTHER']}
      title="Add new credit card"
      onPress={onClick}
      isApplied={false}
      disabled={isPaid}
      applyText="Add"
    />
  )
}

CheckoutCreditCardAdd.displayName = 'CheckoutCreditCardAdd'
CheckoutCreditCardAdd.propTypes = {
  isPaid: propTypes.bool,
}

export default CheckoutCreditCardAdd
