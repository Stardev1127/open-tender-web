import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import CheckoutButton from './CheckoutButton'
import { Home } from '../../icons'

const CheckoutHouseAccountsView = styled.div``

const CheckoutHouseAccounts = ({ apply, remove, isPaid }) => {
  const { check, form } = useSelector(selectCheckout)
  const houseAccounts = check.customer.house_accounts || []
  const hasHouseAccounts = houseAccounts.length > 0
  const applied = form.tenders
    .filter((i) => i.tender_type === 'HOUSE_ACCOUNT')
    .map((i) => i.house_account_id)

  if (!hasHouseAccounts) return null

  return (
    <CheckoutHouseAccountsView>
      {houseAccounts.map((houseAccount) => {
        const {
          house_account_id,
          name,
          pin,
          service_type,
          order_type,
          revenue_centers,
        } = houseAccount
        const isOrderType = order_type ? order_type === check.order_type : true
        const isServiceType = service_type
          ? service_type === check.service_type
          : true
        const revenueCenterId = check.revenue_center.revenue_center_id
        const revenueCenterIds = revenue_centers.map((i) => i.revenue_center_id)
        const isRevenueCenter = revenueCenterIds.length
          ? revenueCenterIds.includes(revenueCenterId)
          : true
        const isApplied = applied.includes(house_account_id)
        const appliedTender = form.tenders.find(
          (i) => i.house_account_id === house_account_id
        )
        const amount = appliedTender
          ? `${formatDollars(appliedTender.amount)} applied to check`
          : `House Account - ${pin}`
        const disabled =
          !isOrderType ||
          !isServiceType ||
          !isRevenueCenter ||
          (isPaid && !isApplied)
        const errMsg = !isRevenueCenter
          ? 'Cannot be used with this location'
          : !isOrderType
          ? 'Cannot be used with this order type'
          : !isServiceType
          ? 'Cannot be used with this service type'
          : null
        const title = `${name}`
        const subtitle = errMsg || amount
        const tender = { tender_type: 'HOUSE_ACCOUNT', ...houseAccount }
        const onPress = isApplied ? () => remove() : () => apply(tender)
        return (
          <CheckoutButton
            key={house_account_id}
            icon={<Home size={18} />}
            title={title}
            subtitle={subtitle}
            onPress={onPress}
            isApplied={isApplied}
            disabled={disabled}
          />
        )
      })}
    </CheckoutHouseAccountsView>
  )
}

CheckoutHouseAccounts.displayName = 'CheckoutHouseAccounts'
CheckoutHouseAccounts.propTypes = {
  apply: propTypes.func,
  remove: propTypes.func,
  isPaid: propTypes.bool,
}

export default CheckoutHouseAccounts
