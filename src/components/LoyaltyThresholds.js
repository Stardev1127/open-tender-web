import styled from '@emotion/styled'
import { Body, Heading } from '@open-tender/components'
import { isMobile } from 'react-device-detect'
import { Star } from './icons'

const LoyaltyThresholdsView = styled.div`
  margin: 4rem 0 0;
  text-align: left;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 2.5rem 0 0;
  }
`

const LoyaltyThresholdsHeader = styled(Heading)`
  margin: 0 0 2rem;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const LoyaltyThreshold = styled.div`
  min-height: 6rem;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  margin: 0 0 1rem;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  border-style: solid;
  border-width: 0.05rem;
  border-color: ${(props) => props.theme.border.color};
  overflow: hidden;
`

const LoyaltyThresholdPoints = styled.div`
  flex: 0 0 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  color: ${(props) => props.theme.bgColors.highlight};
  background-color: ${(props) => props.theme.bgColors.dark};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 8rem;
  }
`

const LoyaltyThresholdPointsText = styled(Heading)`
  margin: 0 0.3rem 0 0;
  color: ${(props) => props.theme.colors.light};
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const LoyaltyThresholdDescription = styled.div`
  flex: 1 1 100%;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const LoyaltyThresholdDescriptionText = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyThresholds = ({ name, thresholds }) => {
  return (
    <LoyaltyThresholdsView>
      <LoyaltyThresholdsHeader as="p">
        What you can get with your {name}
      </LoyaltyThresholdsHeader>
      {thresholds.map((i) => {
        return (
          <LoyaltyThreshold key={i.points}>
            <LoyaltyThresholdPoints>
              <LoyaltyThresholdPointsText>
                {i.points}
              </LoyaltyThresholdPointsText>
              <Star size={isMobile ? 16 : 20} fill="currentColor" />
            </LoyaltyThresholdPoints>
            <LoyaltyThresholdDescription>
              <LoyaltyThresholdDescriptionText>
                {i.description}
              </LoyaltyThresholdDescriptionText>
            </LoyaltyThresholdDescription>
          </LoyaltyThreshold>
        )
      })}
    </LoyaltyThresholdsView>
  )
}

export default LoyaltyThresholds
