import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { makeProgress, makeStatus } from '@open-tender/js'
import { Box, Heading, Text } from '@open-tender/components'
import { PointsBalance, ProgressBar, ProgressCircle } from '.'

const LoyaltyProgramView = styled(Box)`
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.maxWidth};
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 2rem 2rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`

const LoyaltyProgramSummary = styled('div')`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 2.5rem 2.5rem 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
    // margin: 0 0 3rem;
  }

  & > div:first-of-type {
    flex-grow: 1;
  }
`

const LoyaltyProgramHeader = styled('div')`
  margin: 0 0 1.5rem;

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }

  p {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const LoyaltyProgramCredit = styled('div')`
  margin: 1rem 0;

  p + p {
    margin: 0.6rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyProgramStatus = styled('div')`
  flex-grow: 0;
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1rem 0 3.5rem;
  }
`

const LoyaltyProgramStatusHeader = styled('div')`
  margin: 0 0 2.5rem;

  p + p {
    margin: 0.6rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyProgramProgress = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  width: 20rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    margin: 1rem 0 0;
  }

  & > div {
    margin: 1rem auto;
  }

  p {
    text-align: center;
  }

  p:last-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  p:last-of-type {
    line-height: 1.4;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const LoyaltyProgramPoints = styled('div')`
  flex-grow: 0;
  flex-shrink: 0;
  width: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
`

const LoyaltyProgram = ({ program, isLoading = false }) => {
  const {
    name,
    description,
    loyalty_type,
    points,
    spend,
    redemption,
    credit,
    remaining,
    towards,
    progress,
    tiers,
    status,
  } = program
  const currentProgress =
    progress || makeProgress(loyalty_type, spend, redemption)
  const currentCredit = credit ? parseFloat(credit.current) : 0
  const hasCredit = currentCredit > 0
  const currentStatus =
    tiers && status ? makeStatus(tiers, status, points) : null

  return (
    <LoyaltyProgramView>
      <LoyaltyProgramSummary>
        <div>
          <LoyaltyProgramHeader>
            <h2>{name}</h2>
            {description && <p>{description}</p>}
          </LoyaltyProgramHeader>
          {currentCredit ? (
            <LoyaltyProgramCredit>
              <Text color="success" bold={true} as="p">
                ${currentCredit.toFixed(2)} in credit available!
              </Text>
              <p>Apply to your next order when you checkout.</p>
            </LoyaltyProgramCredit>
          ) : !points ? (
            <LoyaltyProgramCredit>
              <Text color="primary" bold={true} as="p">
                $0.00 credit balance
              </Text>
              <p>Make progress towards your next credit with every order.</p>
            </LoyaltyProgramCredit>
          ) : null}
        </div>
        {currentStatus && (
          <LoyaltyProgramStatus>
            <LoyaltyProgramStatusHeader>
              {status.tier ? (
                <p>
                  You're currently at{' '}
                  <Text
                    color="primary"
                    bold={true}
                    style={{ color: `#${status.tier.hex_code}` }}
                  >
                    {status.tier.name}
                  </Text>{' '}
                  status
                </p>
              ) : currentStatus.progress ? (
                <p>You're making progress!</p>
              ) : null}
              <p>{currentStatus.progressMsg}</p>
            </LoyaltyProgramStatusHeader>
            <ProgressBar {...currentStatus} />
          </LoyaltyProgramStatus>
        )}
      </LoyaltyProgramSummary>
      {!!currentProgress ? (
        <LoyaltyProgramProgress>
          <Heading as="p">Current Progress</Heading>
          <ProgressCircle progress={currentProgress} isLoading={isLoading} />
          {currentProgress ? (
            <p>
              {hasCredit ? "You're" : "You're"} ${remaining} away from{' '}
              {hasCredit && 'another '}
              {towards}
            </p>
          ) : (
            <p>Make your first purchase to start earning rewards!</p>
          )}
        </LoyaltyProgramProgress>
      ) : points ? (
        <LoyaltyProgramPoints>
          <PointsBalance {...points} />
        </LoyaltyProgramPoints>
      ) : null}
    </LoyaltyProgramView>
  )
}

LoyaltyProgram.displayName = 'LoyaltyProgram'
LoyaltyProgram.propTypes = {
  program: propTypes.object,
}

export default LoyaltyProgram
