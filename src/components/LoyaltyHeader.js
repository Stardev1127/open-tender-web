import styled from '@emotion/styled'
import { Body, Heading } from '@open-tender/components'

const LoyaltyHeaderView = styled.div`
  text-align: left;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 0 1rem;
  }
`

const LoyaltyHeaderTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const LoyaltyHeaderSubitle = styled(Body)`
  margin: 0.5rem 0 1.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const LoyaltyHeader = ({ title, subtitle }) => {
  return (
    <LoyaltyHeaderView>
      {!!title && <LoyaltyHeaderTitle as="p">{title}</LoyaltyHeaderTitle>}
      {!!subtitle && (
        <LoyaltyHeaderSubitle as="p">{subtitle}</LoyaltyHeaderSubitle>
      )}
    </LoyaltyHeaderView>
  )
}

export default LoyaltyHeader
