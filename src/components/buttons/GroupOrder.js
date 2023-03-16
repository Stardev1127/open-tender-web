import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectGroupOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../../slices'
import { Users } from '../icons'

const GroupOrder = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCartOwner, cartGuest } = useSelector(selectGroupOrder)
  const { revenueCenter } = useSelector(selectOrder)
  const settings = revenueCenter ? revenueCenter.settings || revenueCenter : {}
  const hasGroupOrdering = settings.group_ordering

  const review = () => {
    const reviewOrders = () => navigate(`/review`)
    dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
  }

  if (!hasGroupOrdering || cartGuest) return null

  return (
    <>
      <ButtonStyled
        onClick={review}
        icon={<Users />}
        color="header"
        size="header"
      >
        {isCartOwner ? 'Manage Group Order' : 'Start Group Order'}
      </ButtonStyled>
    </>
  )
}

GroupOrder.displayName = 'GroupOrder'

export default GroupOrder
