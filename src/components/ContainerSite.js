import styled from '@emotion/styled'

const ContainerSite = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.theme.layout.containerMaxWidth};
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

export default ContainerSite
