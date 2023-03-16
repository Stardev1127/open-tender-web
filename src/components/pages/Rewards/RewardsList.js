import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomerRewards, selectCustomerRewards } from '@open-tender/redux'

import { Loading, Rewards } from '../..'

const RewardsList = () => {
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector(selectCustomerRewards)
  const hasRewards = entities.length > 0 && !error

  useEffect(() => {
    dispatch(fetchCustomerRewards())
  }, [dispatch])

  return hasRewards ? (
    <Rewards rewards={entities} />
  ) : loading === 'pending' ? (
    <Loading text="Retrieving your rewards..." />
  ) : (
    <p>
      Looks like you don't currently have any rewards. Pleaes try back later!
    </p>
  )
}

RewardsList.displayName = 'RewardsList'

export default RewardsList
