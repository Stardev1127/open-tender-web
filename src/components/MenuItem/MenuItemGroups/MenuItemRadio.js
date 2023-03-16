import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuItemRadioLabel = styled.label`
  position: relative;
  display: block;
  width: 9.2rem;
  min-width: 9.2rem;
  text-align: center;
  line-height: 1;
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`

const MenuItemRadioInput = styled.input`
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

const MenuItemRadioButton = styled.span`
  content: '';
  display: inline-block;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border-radius: 100%;
  border-width: 0.1rem;
  border-style: solid;
  transition: all 0.15s ease;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-color: ${(props) => props.theme.border.color};

  input:focus + &,
  input:checked + & {
    border-color: ${(props) => props.theme.fonts.headings.color};
  }

  input:checked + &:before {
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.fonts.headings.color};
  }
`

const MenuItemRadio = ({ option, handler }) => {
  return (
    <MenuItemRadioLabel htmlFor={option.id}>
      <MenuItemRadioInput
        id={option.id}
        type="radio"
        checked={option.quantity >= 1}
        onChange={handler}
        disabled={option.isSoldOut}
        aria-label={option.name}
      />
      <MenuItemRadioButton />
    </MenuItemRadioLabel>
  )
}

MenuItemRadio.displayName = 'MenuItemRadio'
MenuItemRadio.propTypes = {
  option: propTypes.object,
  handler: propTypes.func,
}

export default MenuItemRadio
