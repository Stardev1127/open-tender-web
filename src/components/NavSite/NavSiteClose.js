import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { toggleNavSite } from '../../slices'
import { X } from '../icons'

const NavSiteCloseButton = styled.button`
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

const NavSiteClose = () => {
  const dispatch = useDispatch()

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(toggleNavSite())
    evt.target.blur()
  }

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) dispatch(toggleNavSite())
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <NavSiteCloseButton
      onClick={handleClose}
      aria-label="Close menu & return to current page"
    >
      <X size={20} />
    </NavSiteCloseButton>
  )
}

NavSiteClose.displayName = 'NavSiteClose'

export default NavSiteClose
