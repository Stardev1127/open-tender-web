import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Heading } from '@open-tender/components'

const CheckoutSectionTitleView = styled.div`
  margin: 0.9rem 0 0 -0.1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin-top: 0.8rem;
  }
`

const CheckoutSectionTitleText = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const CheckoutSectionTitle = ({ children }) => {
  return (
    <CheckoutSectionTitleView>
      <CheckoutSectionTitleText as="p">{children}</CheckoutSectionTitleText>
    </CheckoutSectionTitleView>
  )
}

CheckoutSectionTitle.displayName = 'CheckoutSectionTitle'
CheckoutSectionTitle.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CheckoutSectionTitle
