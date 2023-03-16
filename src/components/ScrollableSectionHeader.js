import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Heading } from '@open-tender/components'

import SeeMoreLink from './SeeMoreLink'

const ScrollableSectionHeaderView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  margin: 0 0 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    margin: 0 0 0.7rem;
  }

  p {
    line-height: 1;
  }
`

const ScrollableSectionTitle = styled.div`
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const ScrollableSectionHeader = ({ title, to, toText = 'View All', style }) => (
  <ScrollableSectionHeaderView style={style}>
    <ScrollableSectionTitle>
      <Heading as="p">{title}</Heading>
    </ScrollableSectionTitle>
    {to && <SeeMoreLink text={toText} to={to} />}
  </ScrollableSectionHeaderView>
)

ScrollableSectionHeader.displayName = 'ScrollableSectionHeader'
ScrollableSectionHeader.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  style: propTypes.object,
}

export default ScrollableSectionHeader
