import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetOrderType, selectOrder } from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const OrderType = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { serviceType } = useSelector(selectOrder)
  const serviceTypeName = serviceTypeNamesMap[serviceType]

  const changeOrderType = () => {
    dispatch(resetOrderType())
    dispatch(closeModal())
    navigate(`/order-type`)
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title="Change your order type"
        footer={
          <div>
            <ButtonStyled onClick={changeOrderType}>
              Change Order Type
            </ButtonStyled>
            <ButtonStyled onClick={cancel} color="secondary">
              Keep {serviceTypeName}
            </ButtonStyled>
          </div>
        }
      >
        <div>
          <p>Are you sure you want to change your order type?</p>
          <p>
            This will start you over at the beginning, but the items in your
            cart will not be affected.
          </p>
        </div>
      </ModalContent>
    </ModalView>
  )
}

OrderType.displayName = 'OrderType'

export default OrderType
