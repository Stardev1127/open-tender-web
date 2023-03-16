import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Preface, Text } from '@open-tender/components'

const CheckoutSectionView = styled('div')`
  padding: 0 ${(props) => props.theme.layout.padding} 0 0;
  // margin: ${(props) => props.theme.layout.margin} 0 0;
  margin: 4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0 0;
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }

  & > p {
    margin: 0.5em 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const CheckoutSectionPreface = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CheckoutSection = ({ title, subtitle, children, style = null }) => {
  return (
    <CheckoutSectionView style={style}>
      {title ? (
        <CheckoutSectionPreface as="div" color="tertiary">
          {title}
        </CheckoutSectionPreface>
      ) : null}
      {subtitle ? (
        <Text as="p" size="small">
          {subtitle}
        </Text>
      ) : null}
      {children}
    </CheckoutSectionView>
  )
}

CheckoutSection.displayName = 'CheckoutSection'
CheckoutSection.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default CheckoutSection
