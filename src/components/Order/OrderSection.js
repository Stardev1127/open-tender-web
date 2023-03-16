import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const OrderSectionView = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 2rem;
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  &:last-of-type {
    padding: 0;
    border: 0;
    margin: 0;
  }
`

const OrderSectionLabel = styled('div')`
  flex: 0 0 15rem;
  margin: 0 2rem 0 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 auto;
    margin: 0 0 0.5rem;
  }

  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const OrderSectionContent = styled('div')`
  flex: 1;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    margin: 0.3em 0 0;

    &:first-of-type {
      font-size: ${(props) =>
        props.theme.fonts.sizes[props.noTitle ? 'small' : 'main']};
      color: ${(props) =>
        props.theme.fonts[props.noTitle ? 'body' : 'headings'].color};
    }
  }
`

const OrderSection = ({ label, noTitle = false, children }) => {
  return (
    <OrderSectionView>
      <OrderSectionLabel>
        <Preface size="small" color="tertiary">
          {label}
        </Preface>
      </OrderSectionLabel>
      <OrderSectionContent noTitle={noTitle}>{children}</OrderSectionContent>
    </OrderSectionView>
  )
}

OrderSection.displayName = 'OrderSection'
OrderSection.propTypes = {
  label: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default OrderSection
