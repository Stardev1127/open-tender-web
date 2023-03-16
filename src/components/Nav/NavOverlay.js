import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectNav, toggleNav } from '../../slices'

const NavOverlayContainer = styled('div')`
  position: fixed;
  z-index: 16;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const NavOverlay = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectNav)
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="nav-overlay" classNames="md" timeout={250}>
          <NavOverlayContainer onClick={() => dispatch(toggleNav())} />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

NavOverlay.displayName = 'NavOverlay'

export default NavOverlay
