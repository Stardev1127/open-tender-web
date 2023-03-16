import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetOrder, selectOrder } from '@open-tender/redux'
import { openModal } from '../../../slices'
import { ArrowRight, UserCircle } from '../../icons'
import { ButtonLarge } from '../..'
import styled from '@emotion/styled'

const GuestButtonsView = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row-reverse;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    position: fixed;
    z-index: 10;
    bottom: 0;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: center;
    padding: ${(props) => props.theme.layout.paddingMobile};
    background-color: ${(props) => props.theme.bgColors.primary};
  }

  button {
    min-width: 25rem;
    max-width: calc(50% - 1rem);
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      margin: 0;
    }
  }

  button + button {
    margin: 0 2rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: ${(props) => props.theme.layout.paddingMobile} 0 0;
    }
  }
`

const GuestButtons = React.forwardRef((props, ref) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentOrder = useSelector(selectOrder)
  const { revenueCenter, serviceType, cart } = currentOrder
  const isCurrentOrder = revenueCenter && serviceType && cart.length > 0

  const continueCurrent = () => {
    navigate(revenueCenter ? `/menu/${revenueCenter.slug}` : '/order-type')
  }

  const startNewOrder = () => {
    dispatch(resetOrder())
    navigate(`/order-type`)
  }

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <GuestButtonsView ref={ref}>
      <ButtonLarge onClick={login} text="Sign in or sign up" color="secondary">
        <UserCircle size={22} />
      </ButtonLarge>
      <ButtonLarge
        onClick={isCurrentOrder ? continueCurrent : startNewOrder}
        text={isCurrentOrder ? 'Continue Order' : 'Order Now'}
        color="primary"
      >
        <ArrowRight size={22} strokeWidth={2} />
      </ButtonLarge>
    </GuestButtonsView>
  )
})

GuestButtons.displayName = 'GuestButtons'

export default GuestButtons
