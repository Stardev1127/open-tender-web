import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reopenGroupOrder,
  removeCustomerGroupOrder,
  selectMenuSlug,
  updateOrder,
} from '@open-tender/redux'
import { makeOrderTypeName } from '@open-tender/js'
import { Box, ButtonStyled, Heading } from '@open-tender/components'

const OrderCardGroupSimpleButton = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
`

const OrderCardGroupSimpleView = styled(Box)`
  position: relative;
  overflow: hidden;
`

const OrderCardGroupSimpleContent = styled.div`
  padding: ${(props) =>
    props.theme.cards.default.bgColor === 'transparent'
      ? '0 0 0'
      : '1.3rem 1.3rem 1.2rem'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) =>
      props.theme.cards.default.bgColor === 'transparent'
        ? '0 0 0'
        : '1rem 1rem 0.8rem'};
  }
`

const OrderCardGroupSimpleTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const OrderCardGroupSimpleDescription = styled.p`
  margin: 0.5rem 0 0;
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderCardGroupSimpleButtons = styled.div`
  margin: 1.5rem 0 0;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const OrderCardGroupSimple = ({ order }) => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    cart_id,
    revenue_center: revenueCenter,
    service_type: serviceType,
    address,
    guest_count,
  } = order
  const {
    name,
    revenue_center_type: orderType,
    is_outpost: isOutpost,
  } = revenueCenter
  const orderTypeName = makeOrderTypeName(orderType, serviceType)
  const menuSlug = useSelector(selectMenuSlug)

  const deleteOrder = () => {
    dispatch(removeCustomerGroupOrder(cart_id))
  }

  const reopenOrder = () => {
    const data = { orderId: null, orderType, serviceType, isOutpost, address }
    dispatch(updateOrder(data))
    dispatch(reopenGroupOrder(order)).then(() => setOpen(true))
  }

  useEffect(() => {
    if (open && menuSlug && menuSlug !== '/') {
      setOpen(false)
      navigate(menuSlug)
    }
  }, [open, menuSlug, navigate])

  return (
    <OrderCardGroupSimpleButton>
      <OrderCardGroupSimpleView>
        {/* <OrderCardGroupSimpleImage style={bgStyle} /> */}
        <OrderCardGroupSimpleContent>
          <OrderCardGroupSimpleTitle as="p" className="title">
            {orderTypeName} from {name}
          </OrderCardGroupSimpleTitle>
          <OrderCardGroupSimpleDescription>
            {guest_count} guests have submitted orders
          </OrderCardGroupSimpleDescription>
          <OrderCardGroupSimpleButtons>
            <ButtonStyled onClick={reopenOrder} size="small">
              Reopen
            </ButtonStyled>
            <ButtonStyled onClick={deleteOrder} size="small" color="secondary">
              Delete
            </ButtonStyled>
          </OrderCardGroupSimpleButtons>
        </OrderCardGroupSimpleContent>
      </OrderCardGroupSimpleView>
    </OrderCardGroupSimpleButton>
  )
}

OrderCardGroupSimple.displayName = 'OrderCardGroupSimple'
OrderCardGroupSimple.propTypes = {
  order: propTypes.object,
}

export default OrderCardGroupSimple
