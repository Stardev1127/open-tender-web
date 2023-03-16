import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { PageSectionHeader } from '.'

const PageSectionView = styled('div')`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }

  &:first-of-type {
    margin-top: 0;
  }
`

const PageSection = ({
  id = null,
  title,
  subtitle,
  to,
  style = null,
  children,
}) => {
  return (
    <PageSectionView id={id} style={style}>
      <PageSectionHeader title={title} subtitle={subtitle} />
      {children}
    </PageSectionView>
  )
}

PageSection.displayName = 'PageHeader'
PageSection.propTypes = {
  id: propTypes.string,
  title: propTypes.string,
  subtitle: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default PageSection
