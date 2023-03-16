import { useSelector } from 'react-redux'

import { selectBrand } from '../../../slices'
import AccountSection from './AccountSection'
import AccountLoyaltyProgram from './AccountLoyaltyProgram'
import ThanxLoyalty from '../Rewards/ThanxLoyalty'
import LevelUpLoyalty from '../Rewards/LevelUpLoyalty'

const AccountLoyalty = () => {
  const { has_loyalty, has_thanx, has_levelup } = useSelector(selectBrand)
  const loyalty = has_loyalty ? (
    <AccountLoyaltyProgram />
  ) : has_thanx ? (
    <ThanxLoyalty isAccount={true} />
  ) : has_levelup ? (
    <LevelUpLoyalty />
  ) : null

  if (!loyalty) return null

  return <AccountSection>{loyalty}</AccountSection>
}

AccountLoyalty.displayName = 'AccountLoyalty'

export default AccountLoyalty
