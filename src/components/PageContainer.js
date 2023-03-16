import styled from '@emotion/styled'

const PageContainer = styled.div`
  label: PageContainer;
  width: 100%;
  // max-width: 140rem;
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  margin: ${(props) => props.theme.layout.margin} auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} auto;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

export default PageContainer
