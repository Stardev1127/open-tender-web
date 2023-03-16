import React from 'react'
import propTypes from 'prop-types'
import ClipLoader from 'react-spinners/ClipLoader'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'

import { closeModal } from '../../slices'

const ModalLoadingView = styled('div')`
  position: fixed;
  z-index: 109;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
`

const ModalLoading = ({ show }) => {
  const dispatch = useDispatch()

  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="loader"
          classNames="md"
          timeout={{ enter: 250, exit: 250 }}
        >
          <ModalLoadingView
            id="modal-container"
            onClick={() => dispatch(closeModal())}
          >
            <ClipLoader size={44} color={'#ffffff'} />
          </ModalLoadingView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

ModalLoading.displayName = 'ModalLoading'
ModalLoading.propTypes = {
  show: propTypes.bool,
}

export default ModalLoading
