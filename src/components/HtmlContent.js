import styled from '@emotion/styled'
import propTypes from 'prop-types'

const HtmlContentView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;

  p {
    margin: 1em 0;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
      margin: 1em 0;
    }

    &:first-of-type {
      margin-top: 0;
    }

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    margin: 1em 0 1em 1em;
  }

  ul {
    list-style: disc outside;
  }

  ul li,
  ol li {
    margin: 0.5em 0;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
      margin: 0.5em 0;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1em;

    & + p {
      margin: 1em 0 0 !important;
    }

    & + ul,
    & + ol {
      margin-top: 0.5em;
    }
  }
`

const HtmlContent = ({ content }) => {
  const hasContent = !!(content && content.length)
  if (!hasContent || content === '<p><br></p>') return null
  return <HtmlContentView dangerouslySetInnerHTML={{ __html: content }} />
}

HtmlContent.displayName = 'HtmlContent'
HtmlContent.propTypes = {
  content: propTypes.string,
}

export default HtmlContent
