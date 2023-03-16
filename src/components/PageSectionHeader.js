import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body, Headline } from '@open-tender/components'

const PageSectionHeaderView = styled.div`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  text-align: center;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
    text-align: left;
  }
`

const PageSectionHeaderTitle = styled(Headline)`
  margin: 0 0 0 -0.1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
  }
`

const PageSectionHeaderSubtitle = styled(Body)`
  margin: 0.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const PageSectionHeader = ({ title, subtitle, style = null, children }) => {
  return (
    <PageSectionHeaderView style={style}>
      {title && (
        <PageSectionHeaderTitle as="h2">{title}</PageSectionHeaderTitle>
      )}
      {subtitle && (
        <PageSectionHeaderSubtitle as="p">{subtitle}</PageSectionHeaderSubtitle>
      )}
      {children}
    </PageSectionHeaderView>
  )
}

PageSectionHeader.displayName = 'PageSectionHeader'
PageSectionHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageSectionHeader
