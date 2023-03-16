import styled from '@emotion/styled'

const PageView = styled('div')`
  display: flex;
  flex-direction: column;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
`

export default PageView
