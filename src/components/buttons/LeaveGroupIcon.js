import { useDispatch } from 'react-redux'
import { openModal } from '../../slices'
import { UserMinus } from '../icons'
import Icon from './Icon'

const LeaveGroupIcon = ({ style, fill }) => {
  const dispatch = useDispatch()

  const leave = () => {
    dispatch(openModal({ type: 'groupOrderLeave' }))
  }

  return (
    <Icon onClick={leave} style={style}>
      <UserMinus size={22} fill={fill || 'none'} />
    </Icon>
  )
}

LeaveGroupIcon.displayName = 'LeaveGroupIcon'

export default LeaveGroupIcon
