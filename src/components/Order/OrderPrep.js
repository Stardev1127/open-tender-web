import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isoToDateStr, parseIsoToDate } from '@open-tender/js'
import { fetchCustomerOrder, selectCustomerOrder } from '@open-tender/redux'
import { Heading } from '@open-tender/components'
import OrderProgress from './OrderProgress'

const OrderPrepView = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: flex-start;
    margin: 3rem 0;
  }
`

const OrderPrepContainer = styled.div`
  position: relative;
  padding: 0 0 0 7rem;
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 0 5rem;
  }
`

const OrderPrepProgress = styled.div`
  position: absolute;
  top: 2rem;
  left: 0;
  bottom: 3rem;
  width: 7rem;
  display: flex;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 5rem;
    justify-content: flex-start;
    padding: 0 0 0 1.5rem;
  }
`

const OrderPrepStepView = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const OrderPrepStepTitleActive = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const OrderPrepStepTitle = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const OrderPrepStepSubtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.tertiary};
`

const formatDate = (timestamp) => {
  if (!timestamp) return ' '
  return isoToDateStr(timestamp, null, 'MMM d, yyyy @ h:mma')
    .replace('PM', 'pm')
    .replace('AM', 'am')
}

const OrderPrepStep = ({ title, timestamp, isActive }) => {
  return (
    <OrderPrepStepView>
      <div>
        {isActive ? (
          <OrderPrepStepTitleActive as="p">{title}</OrderPrepStepTitleActive>
        ) : (
          <OrderPrepStepTitle>{title}</OrderPrepStepTitle>
        )}
        <OrderPrepStepSubtitle>{formatDate(timestamp)}</OrderPrepStepSubtitle>
      </div>
    </OrderPrepStepView>
  )
}

const statusPercentages = {
  TODO: 25,
  IN_PROGRESS: 50,
  DONE: 75,
  COMPLETED: 100,
}

const statusPercentagesFulfilled = {
  TODO: 20,
  IN_PROGRESS: 40,
  DONE: 60,
  COMPLETED: 80,
  FULFILLED: 100,
}

const OrderPrep = ({ orderId, orderPrep, serviceType }) => {
  const dispatch = useDispatch()
  const { order } = useSelector(selectCustomerOrder)
  const {
    prep_status,
    created_at,
    fire_at,
    done_at,
    completed_at,
    expected_at,
  } =
    order && order.order_id === orderId
      ? order.order_prep || {}
      : orderPrep || {}
  const { service_type } = order || {}
  const orderServiceType = service_type || serviceType
  const isDelivery = orderServiceType === 'DELIVERY'
  const isFulfilled = prep_status === 'FULFILLED'
  const percent = isFulfilled
    ? statusPercentagesFulfilled[prep_status]
    : statusPercentages[prep_status]
  const createdDate = parseIsoToDate(created_at)
  const fireDate = parseIsoToDate(fire_at)
  const progressAt = createdDate > fireDate ? created_at : fire_at

  useEffect(() => {
    if (fire_at !== null && !isFulfilled) {
      const update = setInterval(
        () => dispatch(fetchCustomerOrder(orderId)),
        15000
      )
      return () => clearInterval(update)
    }
  }, [dispatch, orderId, fire_at, isFulfilled])

  if (!fire_at) return null

  return (
    <OrderPrepView>
      <OrderPrepContainer>
        <OrderPrepProgress>
          <OrderProgress
            prepStatus={prep_status}
            isFulfilled={isFulfilled}
            statusPercentages={statusPercentages}
            statusPercentagesFulfilled={statusPercentagesFulfilled}
          />
        </OrderPrepProgress>
        <OrderPrepStep title="Order submitted" timestamp={created_at} />
        <OrderPrepStep
          title="Order received"
          timestamp={created_at}
          isActive={prep_status === 'TODO'}
        />
        <OrderPrepStep
          title="Preparing your order"
          timestamp={percent >= 50 ? progressAt : null}
          isActive={prep_status === 'IN_PROGRESS'}
        />
        <OrderPrepStep
          title="Double checking your order"
          timestamp={done_at}
          isActive={prep_status === 'DONE'}
        />
        <OrderPrepStep
          title={
            isDelivery ? 'Order is on the way!' : 'Order ready for pickup!'
          }
          timestamp={completed_at}
          isActive={prep_status === 'COMPLETED'}
        />
        {isFulfilled && (
          <OrderPrepStep
            title={
              isDelivery
                ? 'Order has been delivered!'
                : 'Order has been picked up!'
            }
            timestamp={expected_at}
            isActive={prep_status === 'FULFILLED'}
          />
        )}
      </OrderPrepContainer>
    </OrderPrepView>
  )
}

OrderPrep.displayName = 'OrderPrep'
OrderPrep.propTypes = {
  orderId: propTypes.number,
  orderPrep: propTypes.object,
  serviceType: propTypes.string,
}

export default OrderPrep
