import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body, Headline } from '@open-tender/components'

const PageTitleView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  text-align: center;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: 0 auto ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    margin: 0 auto ${(props) => props.theme.layout.marginMobile};
    text-align: left;
  }
`

const PageTitleTitle = styled(Headline)`
  margin: 0 0 0 -0.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizesMobile.h1};
  }
`

const PageTitleSubtitle = styled(Body)`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizesMobile.small};
  }
`

const PageTitle = ({ title, subtitle, children, style = null }) => {
  return (
    <PageTitleView style={style}>
      {title && <PageTitleTitle as="h1">{title}</PageTitleTitle>}
      {subtitle && <PageTitleSubtitle as="p">{subtitle}</PageTitleSubtitle>}
      {children}
    </PageTitleView>
  )
}

PageTitle.displayName = 'PageTitle'
PageTitle.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageTitle
