import styled from '@emotion/styled'

const PageTitleButtons = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    align-items: flex-start;
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
  }

  button {
    min-width: 24rem;
    max-width: 100%;
    margin: 0 0 1rem;

    &:last-of-type {
      margin: 0;
    }
  }
`

export default PageTitleButtons
