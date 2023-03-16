import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuItemCheckboxLabel = styled.label`
  position: relative;
  display: block;
  width: 9.2rem;
  min-width: 9.2rem;
  text-align: center;
  line-height: 1;
  // opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

const MenuItemCheckboxInput = styled.input`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
`

const MenuItemCheckboxButton = styled.span`
  content: '';
  display: inline-block;
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  padding: 0;
  border-width: 0.1rem;
  border-style: solid;
  transition: all 0.1s ease;
  background-image: linear-gradient(
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.primary}
  );
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 0% 0%;
  border-color: ${(props) => props.theme.border.color};

  input:focus + & {
    outline-color: ${(props) => props.theme.colors.primary};
    outline-style: auto;
    outline-width: 0.3rem;
    outline-offset: 0.3rem;
  }

  input:checked + & {
    border-color: ${(props) => props.theme.colors.primary};
    background-size: 100% 100%;
  }

  &:before {
    content: '';
    position: absolute;
    width: 1.2rem;
    height: 0.7rem;
    background: transparent;
    top: 0.4rem;
    left: 0.4rem;
    border-width: 0.2rem;
    border-style: solid;
    border-top: none;
    border-right: none;
    transform: scale(0) rotate(-45deg);
    opacity: 0;
    transition: all 0.1s ease;
    color: ${(props) => props.theme.bgColors.primary};
  }

  input:checked + &:before {
    opacity: 1;
    transform: scale(1) rotate(-45deg);
  }

  input:disabled + & {
    opacity: 0.4;
    cursor: default;
  }

  input:disabled + &:before {
    opacity: 0.4;
    cursor: default;
  }
`

const MenuItemCheckbox = ({
  option,
  increment,
  decrement,
  incrementDisabled,
}) => {
  const disabled =
    (incrementDisabled && option.quantity === 0) || option.isSoldOut

  const toggle = (evt) => {
    evt.target.checked ? increment() : decrement()
  }

  return (
    <MenuItemCheckboxLabel disabled={disabled} htmlFor={option.id}>
      <MenuItemCheckboxInput
        id={option.id}
        type="checkbox"
        checked={option.quantity === 1}
        onChange={toggle}
        disabled={disabled}
        aria-label={option.name}
      />
      <MenuItemCheckboxButton />
    </MenuItemCheckboxLabel>
  )
}

MenuItemCheckbox.displayName = 'MenuItemCheckbox'
MenuItemCheckbox.propTypes = {
  option: propTypes.object,
  increment: propTypes.func,
  decrement: propTypes.func,
  incrementDisabled: propTypes.bool,
}

export default MenuItemCheckbox
