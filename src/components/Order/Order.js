import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCustomer,
  selectCustomerFavorites,
  setOrderServiceType,
  setAddress,
  reorderPastOrder,
  resetCustomerOrder,
  editOrder,
} from '@open-tender/redux'
import {
  makeOrderTypeName,
  makeDisplayItem,
  isEmpty,
  isoToDate,
} from '@open-tender/js'
import {
  ButtonStyled,
  CartSummaryItem,
  CheckSummary,
  Headline,
  Preface,
} from '@open-tender/components'

import { openModal } from '../../slices'
import { Favorite } from '../buttons'
import { FormSection, Loading } from '..'
import OrderAddress from '../OrderAddress'
import OrderRating from './OrderRating'
import OrderRequestedAt from './OrderRequestedAt'
import OrderRevenueCenter from './OrderRevenueCenter'
import OrderSection from './OrderSection'
import OrderFulfillment from './OrderFulfillment'
import OrderPrep from './OrderPrep'

const OrderView = styled.div`
  margin: 4rem auto;
  max-width: 54rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    margin: 3rem auto;
  }
`

const OrderHeader = styled.div`
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: left;
  }

  & > span {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const OrderTitle = styled(Headline)`
  margin: 0.5rem 0;
  font-size: ${(props) => props.theme.fonts.sizes.h1};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const OrderButtons = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: flex-start;
    margin: 2.5rem 0 3rem;
  }

  button + button {
    margin-left: 1rem;
  }
`

const OrderDetails = styled.div`
  margin: 3rem 0 0;
`

const OrderItems = styled.div`
  margin: 3rem 0 0;
`

const OrderFavorite = styled.div`
  margin: 0 0 0;
`

const OrderCentered = styled.div`
  display: flex;
  justify-content: center;
  max-width: 54rem;
  margin: 4rem auto;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

const handleOrderError = (error) => {
  switch (error) {
    case 'The requested object does not exist.':
      return "We couldn't find this order. Please double check your order ID and give it another try."
    default:
      return error
  }
}

const Order = ({ order, loading, error, isConfirmation }) => {
  const {
    order_id,
    status,
    service_type,
    order_type,
    revenue_center,
    is_asap,
    requested_at,
    requested_time,
    estimated_at,
    timezone,
    delivery,
    address,
    cart,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
    order_fulfillment,
    tenders,
    rating,
    order_prep,
  } = order || {}
  const dispatch = useDispatch()
  const isLoading = loading === 'pending'
  const isMerch = order_type === 'MERCH'
  const errMsg = handleOrderError(error)
  let orderTypeName = makeOrderTypeName(order_type, service_type)
  const isUpcoming = isoToDate(requested_at) > new Date()
  const displayedItems = cart ? cart.map((i) => makeDisplayItem(i)) : []
  const { lookup = {} } = useSelector(selectCustomerFavorites)
  const { auth } = useSelector(selectCustomer)
  const check = { gift_cards, surcharges, discounts, taxes, totals, details }
  const {
    eating_utensils,
    serving_utensils,
    person_count,
    notes,
    notes_internal,
    tax_exempt_id,
  } = details || {}
  orderTypeName =
    notes_internal && notes_internal.includes('TAKE OUT')
      ? 'Take Out'
      : orderTypeName
  const hasDetails =
    eating_utensils || serving_utensils || person_count || tax_exempt_id
  const orderTitle = revenue_center
    ? `${orderTypeName} from ${revenue_center.name}`
    : ''

  useEffect(() => {
    return () => dispatch(resetCustomerOrder())
  }, [dispatch])

  const handleReorder = () => {
    const { revenue_center_id: revenueCenterId } = revenue_center
    const serviceType = service_type
    dispatch(setOrderServiceType(order_type, service_type))
    dispatch(setAddress(address || null))
    dispatch(reorderPastOrder({ revenueCenterId, serviceType, items: cart }))
  }

  const updateRating = () => {
    const args = { orderId: order_id, orderRating: rating || {} }
    dispatch(openModal({ type: 'rating', args }))
  }

  return !isEmpty(order) ? (
    <OrderView>
      <OrderHeader>
        <Preface size="small" color="tertiary">
          Order #{order_id}
        </Preface>
        <OrderTitle as={isConfirmation ? 'h2' : 'h1'}>{orderTitle}</OrderTitle>
        {!isMerch && auth && (
          <OrderButtons>
            {order.is_editable && (
              <ButtonStyled
                onClick={() => dispatch(editOrder(order))}
                size="small"
              >
                Edit
              </ButtonStyled>
            )}
            <ButtonStyled onClick={handleReorder} size="small">
              Reorder
            </ButtonStyled>
            {!isUpcoming && (
              <ButtonStyled
                onClick={updateRating}
                size="small"
                color="secondary"
              >
                {rating ? 'Update Rating' : 'Rate Order'}
              </ButtonStyled>
            )}
          </OrderButtons>
        )}
      </OrderHeader>
      <OrderPrep
        orderId={order_id}
        orderPrep={order_prep}
        serviceType={service_type}
      />
      <OrderDetails>
        <OrderSection label="Location">
          <OrderRevenueCenter revenueCenter={revenue_center} />
        </OrderSection>
        <OrderSection label="Requested Time">
          <OrderRequestedAt
            estimated_at={estimated_at || requested_at}
            requested_time={requested_time}
            timezone={timezone}
            is_asap={is_asap}
            status={status}
          />
        </OrderSection>
        {service_type === 'DELIVERY' && address && (
          <OrderSection label="Delivery Address">
            <OrderAddress
              address={address}
              delivery={delivery}
              status={status}
            />
          </OrderSection>
        )}
        {order_fulfillment && (
          <OrderSection label="Curbside Pickup">
            <OrderFulfillment {...order_fulfillment} />
          </OrderSection>
        )}
        {notes && notes.length ? (
          <OrderSection label="Notes" noTitle={true}>
            <p>{notes}</p>
          </OrderSection>
        ) : null}
        {hasDetails && (
          <OrderSection label="Other Details" noTitle={true}>
            {eating_utensils ? (
              <p>
                Eating utensils included
                {person_count && ` for ${person_count} people`}
              </p>
            ) : (
              person_count && <p>{person_count} people to be accommodated</p>
            )}
            {serving_utensils && <p>Serving utensils included</p>}
            {tax_exempt_id && <p>Tax exempt ID of {tax_exempt_id}</p>}
          </OrderSection>
        )}
        {rating ? (
          <OrderSection label="Rating">
            <OrderRating {...rating} />
          </OrderSection>
        ) : null}
      </OrderDetails>
      <FormSection title="Order Summary & Receipt">
        {displayedItems.length > 0 && (
          <OrderItems>
            {displayedItems.map((item, index) => {
              const show = auth && lookup
              const favoriteId = lookup ? lookup[item.signature] || null : null
              return (
                <CartSummaryItem key={`${item.id}-${index}`} item={item}>
                  {show && (
                    <OrderFavorite>
                      <Favorite item={item} favoriteId={favoriteId} />
                    </OrderFavorite>
                  )}
                </CartSummaryItem>
              )
            })}
          </OrderItems>
        )}
        <CheckSummary check={check} tenders={tenders} showTenders={true} />
      </FormSection>
    </OrderView>
  ) : isLoading ? (
    <OrderCentered>
      <Loading text="Retrieving your order..." />
    </OrderCentered>
  ) : error ? (
    <OrderCentered>
      <p>{errMsg}</p>
    </OrderCentered>
  ) : null
}

Order.displayName = 'Order'
Order.propTypes = {
  order: propTypes.object,
  loading: propTypes.string,
  error: propTypes.string,
  goToAccount: propTypes.func,
}

export default Order
