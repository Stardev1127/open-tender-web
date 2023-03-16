import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const ModalOverlayView = styled('div')`
  position: fixed;
  z-index: 108;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const ModalOverlay = ({ show }) => (
  <TransitionGroup component={null}>
    {show ? (
      <CSSTransition
        key="overlay"
        classNames="md"
        timeout={{ enter: 250, exit: 250 }}
      >
        <ModalOverlayView />
      </CSSTransition>
    ) : null}
  </TransitionGroup>
)

ModalOverlay.displayName = 'ModalOverlay'
ModalOverlay.propTypes = {
  show: propTypes.bool,
}

export default ModalOverlay
