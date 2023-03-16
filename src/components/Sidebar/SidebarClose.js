import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { toggleSidebar } from '../../slices'
import { X } from '../icons'

const SidebarCloseButton = styled.button`
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  color: ${(props) => props.theme.links.dark.color};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.links.dark.color};
    }
  }

  &:disabled {
    color: ${(props) => props.theme.links.dark.color};
    opacity: 0.5;
  }
`

const SidebarClose = () => {
  const dispatch = useDispatch()

  return (
    <SidebarCloseButton
      onClick={() => dispatch(toggleSidebar())}
      aria-label="Close cart & return to current page"
    >
      <X size={20} />
    </SidebarCloseButton>
  )
}

SidebarClose.displayName = 'SidebarClose'
SidebarClose.propTypes = {
  classes: propTypes.string,
  handleClose: propTypes.func,
}

export default SidebarClose
