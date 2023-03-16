import styled from '@emotion/styled'

const AccountSection = styled.div`
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: ${(props) => props.theme.layout.margin} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 2rem 0;
  }
`

export default AccountSection
