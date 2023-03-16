import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CountView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: ${(props) => props.radius};
  border-width: ${(props) => props.theme.counts.alerts.borderWidth};
  padding-top: ${(props) => props.theme.counts.alerts.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.alerts.paddingBottom};
  color: ${(props) => props.color || props.theme.counts.alerts.color};
  border-color: ${(props) =>
    props.bgColor || props.theme.counts.alerts.borderColor};
  background-color: ${(props) =>
    props.bgColor || props.theme.counts.alerts.bgColor};
`

const CountCount = styled.span`
  display: block;
  line-height: 0;
  -webkit-font-smoothing: ${(props) => props.theme.counts.alerts.fontSmoothing};
  font-family: ${(props) => props.theme.counts.alerts.family};
  font-weight: ${(props) => props.theme.counts.alerts.weight};
  font-size: ${(props) => props.theme.fonts.sizes[props.fontSize]};
`

const Count = ({ count, color, bgColor, size = 20, fontSize = 'xSmall' }) => {
  return (
    <CountView
      color={color}
      bgColor={bgColor}
      size={`${size / 10}rem`}
      radius={`${parseFloat(size / 20)}rem`}
    >
      <CountCount fontSize={fontSize}>{count}</CountCount>
    </CountView>
  )
}

Count.displayName = 'Count'
Count.propTypes = {
  count: propTypes.oneOfType([propTypes.number, propTypes.string]),
  color: propTypes.string,
  bgColor: propTypes.string,
  size: propTypes.number,
  fontSize: propTypes.string,
}

export default Count
