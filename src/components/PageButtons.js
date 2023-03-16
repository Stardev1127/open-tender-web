import styled from '@emotion/styled'

const PageButtons = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -2rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: -1rem 0 0;
    flex-wrap: wrap;
  }

  button {
    margin: 1rem 0.5rem 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: block;
      margin: 1rem 0.5rem 0;
    }
  }
`

export default PageButtons
