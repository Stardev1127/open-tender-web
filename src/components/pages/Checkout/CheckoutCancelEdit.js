import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectOrder, resetOrder, resetCheckout } from '@open-tender/redux'
import { ButtonLink, Heading } from '@open-tender/components'

const CheckoutCancelView = styled('div')`
  margin: 3rem 0 0;

  p {
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
  }
`

const CheckoutCancelEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderId } = useSelector(selectOrder)

  const handleCancelEdit = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    navigate(`/account`)
  }

  return orderId ? (
    <CheckoutCancelView>
      <Heading as="p">
        You're currently editing order #{orderId}.{' '}
        <ButtonLink onClick={handleCancelEdit}>
          Click here to cancel this edit.
        </ButtonLink>
      </Heading>
    </CheckoutCancelView>
  ) : null
}

CheckoutCancelEdit.displayName = 'CheckoutCancelEdit'

export default CheckoutCancelEdit
