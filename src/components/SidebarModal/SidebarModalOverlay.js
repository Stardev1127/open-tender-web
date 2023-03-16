import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'

import { selectSidebarModal, toggleSidebarModal } from '../../slices'
import styled from '@emotion/styled'

const SidebarModalOverlayView = styled('div')`
  position: fixed;
  z-index: 16;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const SidebarModalOverlay = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectSidebarModal)
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="sidebar-overlay" classNames="overlay" timeout={500}>
          <SidebarModalOverlayView
            onClick={() => dispatch(toggleSidebarModal())}
          />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

SidebarModalOverlay.displayName = 'SidebarModalOverlay'

export default SidebarModalOverlay
