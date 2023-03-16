import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { toggleNav } from '../../slices'
import { X } from '../icons'

const NavCloseButton = styled.button`
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

const NavClose = () => {
  const dispatch = useDispatch()

  const handleClose = (evt) => {
    evt.preventDefault()
    dispatch(toggleNav())
    evt.target.blur()
  }

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) dispatch(toggleNav())
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return (
    <NavCloseButton
      onClick={handleClose}
      aria-label="Close menu & return to current page"
    >
      <X size={20} />
    </NavCloseButton>
  )
}

NavClose.displayName = 'NavClose'

export default NavClose
