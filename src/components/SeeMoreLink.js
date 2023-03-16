import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Heading } from '@open-tender/components'
import { ArrowRightLong, ChevronRight } from './icons'

const SeeMoreLinkView = styled.div`
  flex-grow: 0;

  a {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.links.dark.color};

    &:hover,
    &:active {
      color: ${(props) => props.theme.links.dark.hover};
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        color: ${(props) => props.theme.links.dark.color};
      }
    }
  }
`

const SeeMoreLinkText = styled(Heading)`
  display: block;
  line-height: 1;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.links.dark.color};
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  a:hover &,
  a:active & {
    color: ${(props) => props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.links.dark.color};
    }
  }
`

const SeeMoreLinkArrow = styled.div`
  margin: 0 0 0 1.5rem;
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const SeeMoreLinkChevron = styled.span`
  display: none;
  width: 1.4rem;
  height: 1.4rem;
  // margin: 0.1rem 0 0 0;
  margin: 0.1rem -0.5rem 0 0;
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
  }
`

const SeeMoreLink = ({ text, to }) => (
  <SeeMoreLinkView>
    <Link to={to}>
      <SeeMoreLinkText>{text}</SeeMoreLinkText>
      <SeeMoreLinkArrow>
        <ArrowRightLong />
      </SeeMoreLinkArrow>
      <SeeMoreLinkChevron>
        <ChevronRight />
      </SeeMoreLinkChevron>
    </Link>
  </SeeMoreLinkView>
)

SeeMoreLink.displayName = 'SeeMoreLink'
SeeMoreLink.propTypes = {
  text: propTypes.string,
  to: propTypes.string,
}

export default SeeMoreLink
