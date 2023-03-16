import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { OrderCard, OrderCardGroup } from '../..'

const OrdersListView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1rem -1rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`
const OrdersListItem = styled.div`
  width: 36rem;
  max-width: 100%;
  padding: 0 1rem;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`

const OrdersList = ({ orders, isGroup = false }) => {
  return (
    <OrdersListView>
      {orders.map((order) => {
        return (
          <OrdersListItem key={order.order_id || order.token}>
            {isGroup ? (
              <OrderCardGroup order={order} />
            ) : (
              <OrderCard order={order} />
            )}
          </OrdersListItem>
        )
      })}
    </OrdersListView>
  )
}

OrdersList.displayName = 'OrdersList'
OrdersList.propTypes = {
  orders: propTypes.array,
  delay: propTypes.number,
}

export default OrdersList
