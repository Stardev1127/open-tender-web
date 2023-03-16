import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  fetchCustomerThanx,
  resetCustomerThanx,
  selectCustomerThanx,
  logoutCustomer,
  addMessage,
} from '@open-tender/redux'
import { Box, Heading } from '@open-tender/components'

import { Loading, ProgressCircle } from '../..'
import { selectContentSection } from '../../../slices'
import PageSectionHeader from '../../PageSectionHeader'

const ThanxProgressView = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ThanxProgressContent = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.layout.padding};
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    margin: 0 auto;
  }

  & > div {
    width: 20rem;
    height: 20rem;
    margin: ${(props) => props.theme.layout.paddingMobile} 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 12rem;
      height: 12rem;
    }
  }

  & > p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.big};
    }
  }

  & > p:last-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.big};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const ThanxProgress = ({ progress, threshold }) => {
  const { percentage = 0, towards = null } = progress || {}
  const currentProgress = parseInt(percentage)
  const remaining = threshold
    ? ((parseFloat(threshold) * (100 - currentProgress)) / 100).toFixed(2)
    : null
  return (
    <ThanxProgressView>
      <ThanxProgressContent>
        <Heading as="p">Current Progress</Heading>
        <ProgressCircle progress={currentProgress} />
        {currentProgress ? (
          <p>
            {remaining
              ? `You're ${remaining} away from your next ${towards}`
              : `You're on your way to your next ${towards}`}
          </p>
        ) : (
          <p>Make your first purchase to start earning rewards!</p>
        )}
      </ThanxProgressContent>
    </ThanxProgressView>
  )
}

ThanxProgress.displayName = 'ThanxProgress'
ThanxProgress.propTypes = {
  progress: propTypes.object,
  threshold: propTypes.number,
}

const ThanxRewardsView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const ThanxRewards = styled.div`
  display: flex;
  flex-direction: column;
`

const ThanxRewardView = styled(Box)`
  position: relative;
  height: 100%;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 2rem 2rem;
  margin: 0 0 2.5rem;
`

const ThanxRewardTitle = styled.h4`
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const ThanxRewardDescription = styled.p`
  margin: 1.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ThanxReward = ({ item }) => {
  const { name, description } = item || {}
  if (!name) return null
  return (
    <ThanxRewardView>
      <ThanxRewardTitle>{name}</ThanxRewardTitle>
      {description && (
        <ThanxRewardDescription>{description}</ThanxRewardDescription>
      )}
    </ThanxRewardView>
  )
}

ThanxReward.displayName = 'ThanxReward'
ThanxReward.propTypes = {
  reward: propTypes.object,
}

const ThanxLoyalty = ({ isAccount = false }) => {
  const dispatch = useDispatch()
  const { rewards: rewardsSection } = useSelector(
    selectContentSection('rewards')
  )
  const { thanx, loading, error } = useSelector(selectCustomerThanx)
  const isLoading = loading === 'pending'
  const { progress, rewards } = thanx || {}
  const thanxRewards =
    rewards &&
    rewards.map((i) => ({
      ...i,
      discount_id: i.ext_id,
    }))

  useEffect(() => {
    dispatch(fetchCustomerThanx())
    return () => dispatch(resetCustomerThanx())
  }, [dispatch])

  useEffect(() => {
    if (error === 'This customer does not have a connected Thanx account') {
      dispatch(logoutCustomer())
      dispatch(resetCustomerThanx())
      dispatch(addMessage('Please login to reauthenticate your account'))
    }
  }, [error, dispatch])

  return (
    <>
      {thanx ? (
        <>
          <ThanxProgress progress={progress} />
          {thanxRewards.length > 0 && (
            <ThanxRewardsView>
              <PageSectionHeader
                title={rewardsSection.title}
                subtitle={rewardsSection.subtitle}
                style={isAccount ? { textAlign: 'left' } : null}
              />
              <ThanxRewards>
                {thanxRewards.map((item) => (
                  <ThanxReward key={item.discount_id} item={item} />
                ))}
              </ThanxRewards>
            </ThanxRewardsView>
          )}
        </>
      ) : isLoading ? (
        <Loading text="Retrieving your rewards..." />
      ) : error ? (
        <p>
          Something appears to have gone wrong. Please try logging out and
          logging back in again.
        </p>
      ) : (
        <p>Looks like you don't have any rewards yet.</p>
      )}
    </>
  )
}

ThanxLoyalty.displayName = 'ThanxLoyalty'
ThanxLoyalty.propTypes = {
  isAccount: propTypes.bool,
}

export default ThanxLoyalty
