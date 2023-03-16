import propTypes from 'prop-types'
import styled from '@emotion/styled'

const Icon = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  margin: ${(props) => props.margin || '0'};
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.color || props.theme.buttons.colors.header.color};

  &:hover {
    color: ${(props) =>
      props.color || props.theme.buttons.colors.headerHover.color};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) =>
        props.color || props.theme.buttons.colors.header.color};
    }
  }
`

Icon.displayName = 'Icon'
Icon.propTypes = {
  color: propTypes.string,
  size: propTypes.number,
}

export default Icon
