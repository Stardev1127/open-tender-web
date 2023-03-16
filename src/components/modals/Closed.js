import React from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetRevenueCenter, resetOrderType } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectConfig, closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const defaultText = {
  title: 'Location currently closed',
  msg: "We're sorry, but this location is currently closed.",
}

const Closed = ({ status, isCancel }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const statusMsg = statusMessages[status] || defaultText

  const changeLocation = () => {
    dispatch(resetRevenueCenter())
    dispatch(closeModal())
    navigate('/locations')
  }

  const startOver = () => {
    dispatch(resetOrderType())
    dispatch(closeModal())
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title={statusMsg.title}
        footer={
          <div>
            <ButtonStyled onClick={changeLocation} color="primary">
              Change Location
            </ButtonStyled>
            {isCancel ? (
              <ButtonStyled onClick={cancel}>Cancel</ButtonStyled>
            ) : (
              <ButtonStyled onClick={startOver}>Start Over</ButtonStyled>
            )}
          </div>
        }
      >
        <div>
          <p>{statusMsg.msg}</p>
        </div>
      </ModalContent>
    </ModalView>
  )
}

Closed.displayName = 'Closed'
Closed.propTypes = {
  title: propTypes.string,
  msg: propTypes.string,
}

export default Closed
