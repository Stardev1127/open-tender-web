import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCustomerLoyalty,
  selectCustomerLoyaltyProgram,
} from '@open-tender/redux'
import { selectBrand, selectContentSection } from '../../../slices'
import { Loading, LoyaltyPoints, LoyaltySpend } from '../..'

const AccountLoyaltyProgram = () => {
  const dispatch = useDispatch()
  const { loyalty } = useSelector(selectBrand)
  const { terms = {} } = loyalty || {}
  const account = useSelector(selectContentSection('account'))
  const { title } = account?.loyalty || {}
  const { program, loading } = useSelector(selectCustomerLoyaltyProgram)
  const hasProgram = program ? true : false
  const { points, credit, redemption, spend } = program || {}

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return loading === 'pending' && !hasProgram ? (
    <Loading text="Retrieving your loyalty status..." />
  ) : points ? (
    <LoyaltyPoints
      title={title}
      terms={points}
      thresholds={terms.thresholds}
      to="/loyalty"
    />
  ) : credit ? (
    <LoyaltySpend
      title={title}
      credit={credit.current}
      spend={spend.current}
      threshold={redemption.threshold}
      reward={redemption.reward}
      to="/loyalty"
    />
  ) : terms.thresholds ? (
    <LoyaltyPoints
      title="Create an account to get started..."
      terms={{ points: 0, ...terms }}
      thresholds={terms.thresholds}
      to="/loyalty"
    />
  ) : (
    <LoyaltySpend
      title="Create an account to get started..."
      credit="0.00"
      spend="0.00"
      threshold={terms.threshold}
      reward={terms.reward}
      to="/loyalty"
    />
  )
}

AccountLoyaltyProgram.displayName = 'AccountLoyaltyProgram'
AccountLoyaltyProgram.propTypes = {}

export default AccountLoyaltyProgram
