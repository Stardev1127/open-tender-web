import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { fetchCustomerLoyalty, selectCustomerLoyalty } from '@open-tender/redux'

import { Loading, LoyaltyProgram, PageContent, PageError } from '../..'

const LoyaltyProgamsView = styled('div')`
  & > div + div {
    margin: 3rem auto 0;
  }
`

const LoyaltyPrograms = () => {
  const dispatch = useDispatch()
  const { entities, loading, error } = useSelector(selectCustomerLoyalty)
  const isLoading = loading === 'pending'

  useEffect(() => {
    dispatch(fetchCustomerLoyalty())
  }, [dispatch])

  return (
    <PageContent>
      {error ? (
        <PageError error={error} />
      ) : entities.length ? (
        <LoyaltyProgamsView>
          {entities.map((program) => {
            return (
              <LoyaltyProgram
                key={program.name}
                program={program}
                isLoading={isLoading}
              />
            )
          })}
        </LoyaltyProgamsView>
      ) : isLoading ? (
        <Loading text="Retrieving your loyalty status..." />
      ) : (
        <p>Looks like you don't have any reward programs yet.</p>
      )}
    </PageContent>
  )
}

LoyaltyPrograms.displayName = 'LoyaltyPrograms'

export default LoyaltyPrograms
