import { useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Minus, Plus, X } from './icons'

const QuantityView = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-width: 9.2rem;

  label {
    display: block;
  }

  button {
    transition: none;
    &:disabled {
      opacity: 0.25;
    }
  }
`

const QuantityAdd = styled.button`
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
  text-align: center;
  font-weight: bold;
  line-height: 0;
  border-radius: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  color: ${(props) => props.theme.colors.primary};
`

const QuantityRemove = styled(QuantityAdd)`
  border-color: ${(props) => props.theme.colors.error};
  color: ${(props) => props.theme.colors.error};
`

const QuantityInput = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  padding: 0;
  border: 0;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.bgColors.dark};
  border-color: ${(props) => props.theme.bgColors.dark};
  padding-top: ${(props) => props.theme.counts.quantity.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.quantity.paddingBottom};
  font-family: ${(props) => props.theme.counts.quantity.family};
  font-weight: ${(props) => props.theme.counts.quantity.weight};
  font-size: ${(props) => props.theme.counts.quantity.fontSize};
  -webkit-font-smoothing: ${(props) =>
    props.theme.counts.quantity.fontSmoothing};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.counts.quantity.fontSizeMobile};
  }

  &:active,
  &:focus,
  &:disabled,
  &:read-only {
    color: ${(props) => props.theme.buttons.colors.primary.color};
    background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
    border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};
  }
`

const QuantityIncrement = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.primary};
`

const Quantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
  isCheckbox = false,
  showAdd = true,
}) => {
  const incrementRef = useRef(null)
  const decrementRef = useRef(null)

  const handleAdd = (evt) => {
    evt.preventDefault()
    increment()
    // const inc = incrementRef.current
    // const dec = decrementRef.current
    // inc && !inc.disabled ? inc.focus() : dec && dec.focus
  }

  const handleAdjust = (evt) => {
    if (item.increment > 1 || item.min > 1 || item.max || !adjust) return
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    adjust(quantity)
  }

  const handleIncrement = (evt) => {
    evt.preventDefault()
    increment()
  }

  const handleDecrement = (evt) => {
    evt.preventDefault()
    decrement()
  }

  return showAdd && item.quantity === 0 ? (
    <QuantityView>
      <QuantityAdd
        onClick={handleAdd}
        disabled={incrementDisabled || item.isSoldOut}
        aria-label="Increase quantity"
      >
        <Plus strokeWidth={2} />
      </QuantityAdd>
    </QuantityView>
  ) : isCheckbox ? (
    <QuantityView>
      <QuantityRemove onClick={decrement} disabled={decrementDisabled}>
        <X strokeWidth={2} />
      </QuantityRemove>
    </QuantityView>
  ) : (
    <QuantityView bgColor="secondary">
      <QuantityIncrement
        ref={decrementRef}
        style={{ marginLeft: '0.2rem' }}
        onClick={handleDecrement}
        disabled={decrementDisabled}
        aria-label="Decrease quantity"
      >
        <Minus strokeWidth={2} />
      </QuantityIncrement>
      <label htmlFor={item.id}>
        <QuantityInput
          id={item.id}
          type="number"
          value={item.quantity}
          onChange={handleAdjust}
          aria-label={item.name}
        />
      </label>
      <QuantityIncrement
        ref={incrementRef}
        style={{ marginRight: '0.2rem' }}
        onClick={handleIncrement}
        disabled={incrementDisabled}
        aria-label="Increase quantity"
      >
        <Plus strokeWidth={2} />
      </QuantityIncrement>
    </QuantityView>
  )
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  item: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  incrementDisabled: propTypes.bool,
  decrementDisabled: propTypes.bool,
  showAdd: propTypes.bool,
}

export default Quantity
