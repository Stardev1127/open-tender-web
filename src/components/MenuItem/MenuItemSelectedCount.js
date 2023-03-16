import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuItemSelectedCountView = styled.div`
  position: absolute;
  z-index: 3;
  top: -0.5rem;
  right: -0.7rem;
  min-width: 1.4rem;
  height: 1.4rem;
  border-radius: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: ${(props) => props.theme.counts.alerts.borderWidth};
  padding-top: ${(props) => props.theme.counts.alerts.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.alerts.paddingBottom};
  color: ${(props) => props.theme.counts.alerts.color};
  background-color: ${(props) => props.theme.counts.alerts.bgColor};
  border-color: ${(props) => props.theme.counts.alerts.borderColor};

  span {
    display: block;
    line-height: 0;
    font-family: ${(props) => props.theme.counts.alerts.family};
    font-weight: ${(props) => props.theme.counts.alerts.weight};
    font-size: 0.8rem;
    -webkit-font-smoothing: ${(props) =>
      props.theme.counts.alerts.fontSmoothing};
  }
`

const MenuItemSelectedCount = ({ count }) => {
  if (!count) return null
  return (
    <MenuItemSelectedCountView>
      <span>{count}</span>
    </MenuItemSelectedCountView>
  )
}

MenuItemSelectedCount.displayName = 'MenuItemSelectedCount'
MenuItemSelectedCount.propTypes = {
  count: propTypes.number,
}

export default MenuItemSelectedCount
