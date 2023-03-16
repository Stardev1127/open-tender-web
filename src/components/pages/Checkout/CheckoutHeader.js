import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeGroupOrder,
  selectCheckout,
  selectGroupOrder,
  selectMenuSlug,
  selectOrder,
  setCart,
} from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import { isMobile } from 'react-device-detect'

import { Back, Cart, NavMenu } from '../../buttons'
import { Header } from '../..'
import { useNavigate } from 'react-router-dom'

const CheckoutHeaderView = styled('div')`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
    padding: ${(props) => props.theme.layout.paddingMobile};
  }

  button {
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      color: ${(props) => props.theme.links.primary.color};
    }
  }
`

const CheckoutHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const { check } = useSelector(selectCheckout)
  const amount = check ? formatDollars(check.totals.total) : ''

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      navigate('/review')
    })
  }

  const back = cartId ? <Back onClick={reopen} /> : <Back path={menuSlug} />

  return isMobile ? (
    <Header
      title={`Checkout - ${amount}`}
      left={back}
      right={
        <>
          <Cart />
          <NavMenu />
        </>
      }
    />
  ) : (
    <CheckoutHeaderView>{back}</CheckoutHeaderView>
  )
}

CheckoutHeader.displayName = 'CheckoutHeader'
CheckoutHeader.propTypes = {}

export default CheckoutHeader
