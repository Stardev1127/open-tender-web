import propTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { selectContentSection } from '../../../slices'
import { Reward, ScrollableSection } from '../..'
import AccountSection from './AccountSection'

const AccountRewards = ({ rewards }) => {
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.rewards || {}

  return (
    <AccountSection>
      <ScrollableSection
        title={title}
        to={rewards.length > 2 ? '/rewards' : null}
        items={rewards}
        renderItem={Reward}
        keyName="discount_id"
      />
    </AccountSection>
  )
}

AccountRewards.displayName = 'AccountRewards'
AccountRewards.propTypes = {
  rewards: propTypes.array,
}

export default AccountRewards
