import { useEffect, useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'
import { closeModal } from '../../slices'
import { X } from '../icons'

const ModalCloseX = styled.button`
  position: absolute;
  z-index: 2;
  top: 7px;
  right: 7px;
  display: inline;
  font-size: inherit;
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

const ModalCloseButton = styled('div')`
  position: absolute;
  z-index: 2;
  top: 1.5rem;
  right: 1.5rem;

  button {
    padding: 0.7rem 1.2rem 0.7rem 1rem;
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bgColors.primary};
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.4);

    > span > span {
      margin-right: 0.4rem;
    }
  }
`

const ModalClose = ({ onClick, isButton = false }) => {
  const dispatch = useDispatch()
  const handleClose = useMemo(
    () => onClick || (() => dispatch(closeModal())),
    [onClick, dispatch]
  )

  const handleEscape = useCallback(
    (evt) => {
      if (evt.keyCode === 27) handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false)
    return () => document.removeEventListener('keydown', handleEscape, false)
  }, [handleEscape])

  return isButton ? (
    <ModalCloseButton>
      <ButtonStyled
        icon={<X />}
        onClick={handleClose}
        size="small"
        color="header"
        id="modal-close"
      >
        Close
      </ButtonStyled>
    </ModalCloseButton>
  ) : (
    <ModalCloseX
      id="modal-close"
      onClick={handleClose}
      aria-label="Close dialog"
    >
      <X size={20} />
    </ModalCloseX>
  )
}

ModalClose.displayName = 'ModalClose'
ModalClose.propTypes = {
  onClick: propTypes.func,
  isButton: propTypes.bool,
}

export default ModalClose
