import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import {
  LoyaltyHeader,
  LoyaltyStatus,
  LoyaltyThresholds,
  ProgressPoints,
  SeeMoreLink,
} from '.'

const LoyaltyPointsView = styled.div`
  label: LoyaltyPointsView;
`

const LoyaltyPoints = ({
  title,
  subtitle,
  terms,
  thresholds,
  to,
  showThresholds = false,
}) => {
  const { points, name } = terms

  return (
    <LoyaltyPointsView>
      <LoyaltyHeader title={title} subtitle={subtitle} />
      <LoyaltyStatus count={formatQuantity(points)} name={name}>
        {to && <SeeMoreLink text="See Details" to={to} />}
      </LoyaltyStatus>
      <ProgressPoints name={name} points={points} thresholds={thresholds} />
      {showThresholds && (
        <LoyaltyThresholds name={name} thresholds={thresholds} />
      )}
    </LoyaltyPointsView>
  )
}

LoyaltyPoints.displayName = 'LoyaltyPoints'
LoyaltyPoints.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  terms: propTypes.object,
  thresholds: propTypes.array,
  showThresholds: propTypes.bool,
}

export default LoyaltyPoints
