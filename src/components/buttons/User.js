import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'
import { openModal } from '../../slices'
import { UserCircle } from '../icons'
import Icon from './Icon'

const User = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  const goToSettings = () => navigate('/account/settings')

  return (
    <Icon margin="0 0 0 -1.1rem" onClick={auth ? goToSettings : login}>
      <UserCircle size={28} isFilled={!!auth} />
    </Icon>
  )
}

User.displayName = 'User'

export default User
