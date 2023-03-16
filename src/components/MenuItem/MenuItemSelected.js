import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuItemSelectedOption from './MenuItemSelectedOption'

const MenuItemSelectedView = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  padding: 0.5rem ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0;
    padding: 0.5rem ${(props) => props.theme.layout.paddingMobile};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const makeSelected = (groups) => {
  if (!groups || !groups.length) return []
  const options = groups.reduce((arr, group) => {
    const options = group.options.filter((option) => option.quantity > 0)
    const withGroups = options.map((option) => ({ ...option, group }))
    return [...arr, ...withGroups]
  }, [])
  return options
}

const MenuItemSelected = ({ groups, decrementOption, isReversed = true }) => {
  const selected = makeSelected(groups)
  const reversed = isReversed ? [...selected.reverse()] : selected

  if (!reversed.length) return null

  const decrement = (option) => {
    decrementOption(option.group.id, option.id)
  }

  return (
    <MenuItemSelectedView>
      {reversed.map((option, index) => (
        <MenuItemSelectedOption
          key={`${option.id}-${index}`}
          option={option}
          decrement={decrementOption ? decrement : null}
        />
      ))}
    </MenuItemSelectedView>
  )
}

MenuItemSelected.displayName = 'MenuItemSelected'
MenuItemSelected.propTypes = {
  currentOptions: propTypes.array,
}

export default MenuItemSelected
