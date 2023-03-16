import styled from '@emotion/styled'

const PageContent = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  text-align: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    text-align: left;
  }

  & > p {
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    margin: 1em 0;
  }
`

export default PageContent
