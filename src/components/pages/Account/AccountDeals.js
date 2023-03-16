import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { Reward, ScrollableSection } from '../..'
import { selectContentSection } from '../../../slices'
import AccountSection from './AccountSection'

const AccountDeals = ({ deals }) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.deals || {}

  return (
    <AccountSection>
      <ScrollableSection
        title={title}
        to={deals.length > 2 ? '/deals' : null}
        items={deals}
        renderItem={Reward}
        keyName="discount_id"
      />
    </AccountSection>
  )
}

AccountDeals.displayName = 'AccountDeals'
AccountDeals.propTypes = {
  deals: propTypes.array,
}

export default AccountDeals
