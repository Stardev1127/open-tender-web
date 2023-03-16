import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../../../slices'
import { OrderCardGroup, OrderCardGroupSimple, ScrollableSection } from '../..'
import AccountSection from './AccountSection'

const OrderCardGroupItem = ({ item }) => <OrderCardGroup order={item} />

const OrderCardGroupSimpleItem = ({ item }) => (
  <OrderCardGroupSimple order={item} />
)

const AccountGroupOrders = ({ orders }) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.groupOrders || {}
  const useSimple = true
  const displayed = orders.slice(0, 5)

  return (
    <AccountSection>
      <ScrollableSection
        title={title}
        items={displayed}
        renderItem={useSimple ? OrderCardGroupSimpleItem : OrderCardGroupItem}
        keyName="cart_id"
      />
    </AccountSection>
  )
}

AccountGroupOrders.displayName = 'AccountGroupOrders'
AccountGroupOrders.propTypes = {
  orders: propTypes.array,
}

export default AccountGroupOrders
