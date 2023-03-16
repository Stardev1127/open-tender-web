import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { LoyaltyHeader, LoyaltyStatus, ProgressSpend, SeeMoreLink } from '.'

const LoyaltySpendView = styled.div``

const LoyaltySpend = ({
  title,
  subtitle,
  credit,
  spend,
  threshold,
  reward,
  to,
}) => {
  return (
    <LoyaltySpendView>
      <LoyaltyHeader title={title} subtitle={subtitle} />
      <LoyaltyStatus
        count={formatDollars(credit, '', 0)}
        name="Available Credit"
      >
        {to && <SeeMoreLink text="See Details" to={to} />}
      </LoyaltyStatus>
      <ProgressSpend spend={spend} threshold={threshold} reward={reward} />
    </LoyaltySpendView>
  )
}

LoyaltySpend.displayName = 'LoyaltySpend'
LoyaltySpend.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  credit: propTypes.string,
  spend: propTypes.string,
  threshold: propTypes.string,
  reward: propTypes.string,
}

export default LoyaltySpend
