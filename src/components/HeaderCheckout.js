import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeGroupOrder,
  selectGroupOrder,
  selectMenuSlug,
  selectOrder,
  setCart,
} from '@open-tender/redux'

import { Header } from '.'
import { Back, NavMenu } from './buttons'
import { useNavigate } from 'react-router-dom'

const HeaderCheckout = ({ maxWidth = '100%' }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cart } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const menuSlug = useSelector(selectMenuSlug)

  const reopen = () => {
    const customerCart = cart.filter((i) => i.customer_id)
    dispatch(setCart(customerCart))
    dispatch(closeGroupOrder(cartId, false)).then(() => {
      navigate('/review')
    })
  }

  const back = cartId ? <Back onClick={reopen} /> : <Back path={menuSlug} />

  return <Header maxWidth={maxWidth} left={back} right={<NavMenu />} />
}

HeaderCheckout.displayName = 'HeaderCheckout'
HeaderCheckout.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderCheckout
