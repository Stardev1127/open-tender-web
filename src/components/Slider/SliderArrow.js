import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ArrowLeft, ArrowRight } from '../icons'

const SliderArrowView = styled.button`
  display: block;
  width: ${(props) => props.size.toFixed(2)}rem;
  height: ${(props) => props.size.toFixed(2)}rem;
  border-radius: ${(props) => (props.size / 2).toFixed(2)}rem;
  padding: ${(props) => (props.size / 8).toFixed(2)}rem;
  display: flex;
  jstify-content: center;
  align-items: center;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.buttons.colors.light.borderColor};
  background-color: ${(props) => props.theme.buttons.colors.light.bgColor};
  color: ${(props) => props.theme.buttons.colors.light.color};

  &:hover {
    border-color: ${(props) =>
      props.theme.buttons.colors.lightHover.borderColor};
    background-color: ${(props) =>
      props.theme.buttons.colors.lightHover.bgColor};
    color: ${(props) => props.theme.buttons.colors.lightHover.color};
  }

  & > span {
    display: block;
    width: 100%;
    height: 100%;
  }

  button + & {
    margin-left: ${(props) => (props.size / 4).toFixed(2)}rem;
  }
`

const SliderArrow = ({ direction, size, disabled, onClick }) => {
  return (
    <SliderArrowView
      direction={direction}
      size={size}
      disabled={disabled}
      onClick={onClick}
    >
      <span>{direction === 'LEFT' ? <ArrowLeft /> : <ArrowRight />}</span>
    </SliderArrowView>
  )
}

SliderArrow.displayName = 'SliderArrow'
SliderArrow.propTypes = {
  direction: propTypes.string,
  size: propTypes.number,
  disabled: propTypes.bool,
  onClick: propTypes.func,
}

export default SliderArrow
