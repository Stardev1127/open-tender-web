import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  resetOrder,
  resetCheckout,
  selectCartQuantity,
  selectCartTotal,
  selectCustomer,
  selectMenuSlug,
  selectCanOrder,
  selectGroupOrder,
  selectOrder,
  selectOrderLimits,
  setCart,
  closeGroupOrder,
} from '@open-tender/redux'
import { displayPrice } from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Headline,
} from '@open-tender/components'

import { toggleSidebar } from '../../slices'
import Cart from '../Cart'
import SidebarClose from './SidebarClose'
import styled from '@emotion/styled'
import { UpsellItems } from '..'

const SidebarView = styled.aside`
  position: fixed;
  z-index: 17;
  top: 0;
  bottom: 0;
  right: 0;
  width: 48rem;
  max-width: 100%;
  background-color: ${(props) => props.theme.bgColors.primary};

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`

const SidebarHeader = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: ${(props) => props.theme.bgColors.primary};

  p {
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};

    span {
      padding: 0;
    }
  }

  p + p {
    margin: 1rem 0 0;
  }

  div {
    margin: 2rem auto 0;

    p {
      color: ${(props) => props.theme.colors.alert};
    }
  }
`

const SidebarHeaderTitle = styled(Headline)`
  margin: 0 0 1rem -0.1rem;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
`

const SidebarFooter = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 7rem;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const SidebarButtons = styled.div`
  width: 100%;
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    height: 5rem;
    padding: 0;
  }
`

const SidebarBack = styled.div`
  width: 50%;
  padding: 0 0.5rem 0 2rem;
`

const SidebarCheckout = styled.div`
  width: 50%;
  padding: 0 2rem 0 0.5rem;
`

const SidebarCart = styled.div`
  width: 100%;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 0 0 1rem;
`

const SidebarCartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`

const SidebarCartItems = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 0 2rem;
`

const SidebarUpsell = styled.div`
  flex-grow: 0;
  width: 100%;
`

const Sidebar = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { orderId, cart } = useSelector(selectOrder)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartGuest, isCartOwner, spendingLimit } = groupOrder
  const cartCount = useSelector(selectCartQuantity)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const canOrder = useSelector(selectCanOrder)
  const { orderMinimum, orderMaximum } = useSelector(selectOrderLimits)
  const { auth } = useSelector(selectCustomer)
  const isMenu = pathname.includes('menu')
  const isCheckout = pathname.includes('checkout')
  const isReview = pathname.includes('review')
  const belowMinimum = orderMinimum && cartTotal < orderMinimum
  const aboveMaximum = orderMaximum && cartTotal > orderMaximum
  const notEmpty = cartCount !== 0 || (isCartOwner && isMenu)
  const canCheckout = canOrder && !belowMinimum && !aboveMaximum && notEmpty
  const showReview = cartGuest || (isMenu && isCartOwner)
  const orderMaxType =
    cartGuest && spendingLimit ? 'spending limit' : 'order maximum'
  const hasUpsell = true

  const back = () => {
    dispatch(toggleSidebar())
    if (!isMenu) navigate(menuSlug)
  }

  const review = () => {
    dispatch(toggleSidebar())
    if (!isReview) navigate('/review')
  }

  const checkout = () => {
    dispatch(toggleSidebar())
    if (!isCheckout) {
      navigate(hasUpsell ? '/add-ons' : auth ? '/checkout' : '/checkout/guest')
    }
  }

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(toggleSidebar())
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      navigate('/review')
    })
  }

  const cancelEdit = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    dispatch(toggleSidebar())
    navigate(`/account`)
  }

  return (
    <SidebarView ref={ref}>
      <div>
        <SidebarClose />
        <SidebarHeader>
          <SidebarHeaderTitle as="h2">
            {orderId ? `Editing Order ${orderId}` : 'Your Order'}
          </SidebarHeaderTitle>
          {!notEmpty ? (
            <p>Your cart is currently empty. Please add some items.</p>
          ) : (
            <p>
              <Heading>{cartCount} items</Heading> for a total of{' '}
              <Heading>${cartTotal.toFixed(2)}</Heading> before tax
            </p>
          )}
          {cartCount !== 0 && belowMinimum && (
            <div>
              <p>
                Your cart total is below the order minimum of $
                {displayPrice(orderMinimum)}. Please add some items.
              </p>
            </div>
          )}
          {aboveMaximum && (
            <div>
              <p>
                Your cart total is above the {orderMaxType} of $
                {displayPrice(orderMaximum)}. Please edit or remove one or more
                items before submitting your order.
              </p>
            </div>
          )}
          {orderId ? (
            <p>
              <ButtonLink onClick={cancelEdit}>
                Click here to cancel this edit.
              </ButtonLink>
            </p>
          ) : null}
          {isCartOwner && (
            <div>
              <p>
                This view displays only the items you've added yourself. Click
                the "Review All Orders" button to view items added by others.
              </p>
            </div>
          )}
        </SidebarHeader>
        <SidebarCart>
          <SidebarCartContainer>
            <SidebarCartItems>
              <Cart />
            </SidebarCartItems>
            <SidebarUpsell>
              <UpsellItems />
            </SidebarUpsell>
          </SidebarCartContainer>
        </SidebarCart>
        <SidebarFooter>
          <SidebarButtons>
            <SidebarBack>
              {isCheckout && cartId ? (
                <ButtonStyled onClick={reopen} size="big" color="secondary">
                  Reopen
                </ButtonStyled>
              ) : (
                <ButtonStyled
                  onClick={back}
                  size="big"
                  color="secondary"
                  disabled={!canOrder}
                  label={
                    !notEmpty
                      ? 'Your cart is currently empty. Please add some items.'
                      : null
                  }
                >
                  Menu
                </ButtonStyled>
              )}
            </SidebarBack>
            <SidebarCheckout>
              {showReview ? (
                <ButtonStyled
                  onClick={review}
                  size="big"
                  color="primary"
                  disabled={!canCheckout}
                >
                  {isReview
                    ? 'Close'
                    : isCartOwner
                    ? 'Review All Orders'
                    : 'Submit Order'}
                </ButtonStyled>
              ) : (
                <ButtonStyled
                  onClick={checkout}
                  size="big"
                  color="primary"
                  disabled={!canCheckout}
                >
                  {isCheckout ? 'Close' : 'Checkout'}
                </ButtonStyled>
              )}
            </SidebarCheckout>
          </SidebarButtons>
        </SidebarFooter>
      </div>
    </SidebarView>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
