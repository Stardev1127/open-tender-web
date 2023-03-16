import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { LoyaltyPoints, LoyaltySpend } from '.'

const LoyaltyProgramView = styled.div`
  margin-bottom: ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-bottom: ${(props) => props.theme.layout.marginMobile};
  }
`

const LoyaltyProgram = ({ program, isLoading = false }) => {
  const hasProgram = program ? true : false
  const { name, description, points, credit, redemption, spend, thresholds } =
    program || {}

  if (isLoading && !hasProgram) return null

  return (
    <LoyaltyProgramView>
      {points ? (
        <LoyaltyPoints
          title={name}
          subtitle={description}
          terms={points}
          thresholds={thresholds}
          showThresholds={true}
        />
      ) : credit ? (
        <LoyaltySpend
          title={name}
          subtitle={description}
          credit={credit.current}
          spend={spend.current}
          threshold={redemption.threshold}
          reward={redemption.reward}
        />
      ) : null}
    </LoyaltyProgramView>
  )
}

LoyaltyProgram.displayName = 'LoyaltyProgram'
LoyaltyProgram.propTypes = {
  program: propTypes.object,
}

export default LoyaltyProgram
