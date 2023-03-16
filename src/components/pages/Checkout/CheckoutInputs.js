import styled from '@emotion/styled'

const CheckoutInputs = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  @media (max-width: 1160px) {
    flex-direction: column;
    justify-content: flex-start;
  }

  & > label {
    flex-grow: 1;
    width: 50%;
    padding-right: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      padding-right: ${(props) => props.theme.layout.paddingMobile};
    }
    @media (max-width: 1160px) {
      width: 100%;
    }
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      padding: 0;
    }
  }
`

CheckoutInputs.displayName = 'CheckoutInputs'
CheckoutInputs.propTypes = {}

export default CheckoutInputs
