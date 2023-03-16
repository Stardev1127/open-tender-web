import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  reopenGroupOrder,
  removeCustomerGroupOrder,
  selectMenuSlug,
  updateOrder,
} from '@open-tender/redux'
import {
  timezoneMap,
  isoToDateStr,
  makeOrderAddress,
  makeOrderTypeName,
} from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'
import { Card } from '.'

const OrderCardGroup = ({ order }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    cart_id,
    revenue_center: revenueCenter,
    service_type: serviceType,
    requested_at,
    address,
    guest_count,
    guest_limit,
    spending_limit,
  } = order
  const {
    revenue_center_type: orderType,
    timezone,
    is_outpost: isOutpost,
  } = revenueCenter
  const orderTypeName = makeOrderTypeName(orderType, serviceType)
  const tz = timezoneMap[timezone]
  const requestedAt =
    requested_at === 'asap'
      ? 'ASAP'
      : isoToDateStr(requested_at, tz, 'MMMM d, yyyy @ h:mma')
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
    <Card
      preface={`${guest_count || 0} Guests`}
      title={`${orderTypeName} from ${revenueCenter.name}`}
      content={
        <>
          <p>{requestedAt}</p>
          {address && <p>{makeOrderAddress(address)}</p>}
          {guest_limit && <p>Guest limit: {guest_limit}</p>}
          {spending_limit && <p>Spending limit: ${spending_limit}</p>}
        </>
      }
      footer={
        <>
          <ButtonStyled onClick={reopenOrder} size="small">
            Reopen
          </ButtonStyled>
          <ButtonStyled onClick={deleteOrder} size="small" color="secondary">
            Delete
          </ButtonStyled>
        </>
      }
    />
  )
}

OrderCardGroup.displayName = 'OrderCardGroup'
OrderCardGroup.propTypes = {
  order: propTypes.object,
  menuItems: propTypes.array,
}

export default OrderCardGroup
