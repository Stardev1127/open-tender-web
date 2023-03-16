import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'

import { selectNavSite, toggleNavSite } from '../../slices'

const NavSiteOverlayContainer = styled('div')`
  position: fixed;
  z-index: 16;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const NavSiteOverlay = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectNavSite)
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="nav-overlay" classNames="md" timeout={250}>
          <NavSiteOverlayContainer onClick={() => dispatch(toggleNavSite())} />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

NavSiteOverlay.displayName = 'NavSiteOverlay'

export default NavSiteOverlay
