import { useDispatch } from 'react-redux'
import { toggleNav } from '../../slices'
import { Hamburger } from '../icons'
import Icon from './Icon'

const NavMenu = () => {
  const dispatch = useDispatch()

  return (
    <Icon margin="0 -1.5rem 0 0" onClick={() => dispatch(toggleNav())}>
      <Hamburger size={20} />
    </Icon>
  )
}

NavMenu.displayName = 'NavMenu'

export default NavMenu
