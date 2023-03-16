import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { XCircle } from '../icons'

const LeaveGroup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const leave = () => {
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    navigate(`/account`)
  }

  return (
    <ButtonStyled
      onClick={leave}
      icon={<XCircle />}
      color="header"
      size="header"
    >
      Leave Group Order
    </ButtonStyled>
  )
}

LeaveGroup.displayName = 'LeaveGroup'

export default LeaveGroup
