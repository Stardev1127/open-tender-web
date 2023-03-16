import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { openModal } from '../../slices'
import { UserPlus } from '../icons'
import Icon from './Icon'

const GroupOrder = ({ style, fill }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const review = () => {
    const reviewOrders = () => navigate(`/review`)
    dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
  }

  return (
    <Icon onClick={review} style={style}>
      <UserPlus size={22} fill={fill || 'none'} />
    </Icon>
  )
}

GroupOrder.displayName = 'GroupOrder'

export default GroupOrder
