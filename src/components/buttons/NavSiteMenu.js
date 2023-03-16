import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { toggleNavSite } from '../../slices'
import { Hamburger } from '../icons'
import Icon from './Icon'

const NavSiteMenu = ({ color }) => {
  const dispatch = useDispatch()

  return (
    <Icon
      color={color}
      margin="0 -1.5rem 0 0"
      onClick={() => dispatch(toggleNavSite())}
    >
      <Hamburger size={20} />
    </Icon>
  )
}

NavSiteMenu.displayName = 'NavSiteMenu'
NavSiteMenu.propTypes = {
  color: propTypes.object,
}

export default NavSiteMenu
