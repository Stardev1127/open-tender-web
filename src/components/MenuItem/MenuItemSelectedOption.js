import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body } from '@open-tender/components'
import { X } from '../icons'
import MenuItemSelectedCount from './MenuItemSelectedCount'

const MenuItemSelectedOptionView = styled.span`
  position: relative;
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0.2rem 0.7rem;
  margin: 0 0.5rem 0 0;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const MenuItemSelectedOptionContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemSelectedOptionName = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const MenuItemSelectedOptionRemove = styled.button`
  display: block;
  margin: 0 0 0 0.5rem;
`

const MenuItemSelectedOption = ({ option, decrement }) => {
  return (
    <MenuItemSelectedOptionView>
      {option.quantity > 1 ? (
        <MenuItemSelectedCount count={option.quantity} />
      ) : null}
      <MenuItemSelectedOptionContainer>
        <MenuItemSelectedOptionName>{option.name}</MenuItemSelectedOptionName>
        {decrement ? (
          <MenuItemSelectedOptionRemove onClick={() => decrement(option)}>
            <X size={10} />
          </MenuItemSelectedOptionRemove>
        ) : null}
      </MenuItemSelectedOptionContainer>
    </MenuItemSelectedOptionView>
  )
}

MenuItemSelectedOption.displayName = 'MenuItemSelectedOption'
MenuItemSelectedOption.propTypes = {
  option: propTypes.object,
  index: propTypes.number,
  decrement: propTypes.func,
}

export default MenuItemSelectedOption
