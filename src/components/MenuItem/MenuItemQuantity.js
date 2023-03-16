import { useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'
import { MinusCircle, Plus, PlusCircle } from '../icons'

const MenuItemQuantityView = styled.div`
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  label {
    display: inline-block;
  }

  button {
    transition: none;
    &:disabled {
      opacity: 0.25;
    }
  }
`

const MenuItemQuantityAdd = styled.button`
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
  border-radius: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  text-align: center;
  font-weight: bold;
  line-height: 0;
  color: ${(props) => props.theme.colors.secondary};
`

const MenuItemQuantityInput = styled(Heading)`
  width: 2.5rem;
  padding: 0;
  border: 0;
  text-align: center;
  background-color: transparent;
`

const MenuItemQuantityIncrement = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2rem;
  height: 100%;
  padding: 0.1rem 0.6rem 0;
  color: ${(props) => props.theme.colors.secondary};
`

const MenuItemQuantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
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
    <MenuItemQuantityView>
      <MenuItemQuantityAdd
        onClick={handleAdd}
        disabled={incrementDisabled || item.isSoldOut}
        aria-label="Increase quantity"
      >
        <Plus />
      </MenuItemQuantityAdd>
    </MenuItemQuantityView>
  ) : (
    <MenuItemQuantityView bgColor="secondary">
      <MenuItemQuantityIncrement
        ref={decrementRef}
        style={{ marginLeft: '0.2rem' }}
        onClick={handleDecrement}
        disabled={decrementDisabled}
        aria-label="Decrease quantity"
      >
        <MinusCircle />
      </MenuItemQuantityIncrement>
      <label htmlFor={item.id}>
        <MenuItemQuantityInput
          as="input"
          id={item.id}
          type="number"
          value={item.quantity}
          onChange={handleAdjust}
          aria-label={item.name}
        />
      </label>
      <MenuItemQuantityIncrement
        ref={incrementRef}
        style={{ marginRight: '0.2rem' }}
        onClick={handleIncrement}
        disabled={incrementDisabled}
        aria-label="Increase quantity"
      >
        <PlusCircle />
      </MenuItemQuantityIncrement>
    </MenuItemQuantityView>
  )
}

MenuItemQuantity.displayName = 'MenuItemQuantity'
MenuItemQuantity.propTypes = {
  item: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  incrementDisabled: propTypes.bool,
  decrementDisabled: propTypes.bool,
  iconMap: propTypes.object,
  showAdd: propTypes.bool,
}

export default MenuItemQuantity
