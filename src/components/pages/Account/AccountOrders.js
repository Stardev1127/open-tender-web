import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { OrderCard, OrderCardSimple, ScrollableSection } from '../..'
import { selectContentSection } from '../../../slices'
import AccountSection from './AccountSection'

const OrderCardItem = ({ item }) => <OrderCard order={item} />

const OrderCardSimpleItem = ({ item }) => <OrderCardSimple order={item} />

const AccountOrders = ({ orders }) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.recentOrders || {}
  const useSimple = true
  const filtered = orders
    .map((i) => ({ ...i, key: i.order_id }))
    .filter((i) => i.order_type !== 'MERCH')
  const displayed = filtered.slice(0, 5)

  return (
    <AccountSection>
      <ScrollableSection
        title={title}
        to={displayed.length > 1 ? '/orders' : null}
        items={displayed}
        renderItem={useSimple ? OrderCardSimpleItem : OrderCardItem}
        keyName="order_id"
      />
    </AccountSection>
  )
}

AccountOrders.displayName = 'AccountOrders'
AccountOrders.propTypes = {
  orders: propTypes.array,
}

export default AccountOrders
