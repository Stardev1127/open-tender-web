import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isObject } from '@open-tender/js'
import {
  fetchCustomerLevelUp,
  selectCustomerLevelUpProgram,
} from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageContent } from '../..'
import LevelUpConnect from './LevelUpConnect'

const LevelUpLoyalty = () => {
  const dispatch = useDispatch()
  const { program, loading, error } = useSelector(selectCustomerLevelUpProgram)
  const errMsg = isObject(error) ? null : error
  const { credit } = program || {}
  const extLoyalty = credit
    ? { ...program, credit: { current: credit } }
    : program

  useEffect(() => {
    dispatch(fetchCustomerLevelUp())
  }, [dispatch])

  return (
    <PageContent style={{ maxWidth: '76.8rem', textAlign: 'left' }}>
      {loading === 'pending' ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : errMsg ? (
        <p>{errMsg}</p>
      ) : (
        <>
          {program && <LoyaltyProgram program={extLoyalty} />}
          <LevelUpConnect />
        </>
      )}
    </PageContent>
  )
}

LevelUpLoyalty.displayName = 'LevelUpLoyalty'

export default LevelUpLoyalty
