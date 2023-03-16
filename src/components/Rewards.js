import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Reward } from '.'

const RewardsView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
`

const RewardsContainer = styled.div`
  margin: 0 -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 -0.5rem;
  }
`

const RewardView = styled.div`
  width: 33.33333%;
  padding: 0 1rem 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 50%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 50%;
    padding: 0 0.5rem 2.5rem;
  }
`

const Rewards = ({ rewards, renderItem = Reward }) => {
  return (
    <RewardsView>
      <RewardsContainer>
        {rewards.map((reward) => (
          <RewardView key={reward.discount_id}>
            {renderItem({ item: reward })}
          </RewardView>
        ))}
      </RewardsContainer>
    </RewardsView>
  )
}

Rewards.displayName = 'Rewards'
Rewards.propTypes = {
  rewards: propTypes.array,
}

export default Rewards
