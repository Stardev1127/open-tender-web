import styled from '@emotion/styled'

const MenuItemCount = styled.div`
  position: absolute;
  z-index: 4;
  top: -1.1rem;
  right: -1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  border-style: solid;
  border-width: ${(props) => props.theme.counts.alerts.borderWidth};
  padding-top: ${(props) => props.theme.counts.alerts.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.alerts.paddingBottom};
  color: ${(props) => props.theme.counts.alerts.color};
  background-color: ${(props) => props.theme.counts.alerts.bgColor};
  border-color: ${(props) => props.theme.counts.alerts.borderColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    top: -1rem;
    right: -0.9rem;
    min-width: 2.2rem;
    height: 2.2rem;
  }

  span {
    display: block;
    line-height: 0;
    font-family: ${(props) => props.theme.counts.alerts.family};
    font-weight: ${(props) => props.theme.counts.alerts.weight};
    font-size: ${(props) => props.theme.counts.alerts.fontSize};
    color: ${(props) => props.theme.counts.alerts.color} !important;
    -webkit-font-smoothing: ${(props) =>
      props.theme.counts.alerts.fontSmoothing};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.counts.alerts.fontSizeMobile};
    }
  }
`

export default MenuItemCount
