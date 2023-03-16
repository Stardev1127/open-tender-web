import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuItemPizzaLeft from './MenuItemPizzaLeft'
import MenuItemPizzaRight from './MenuItemPizzaRight'
import MenuItemPizzaWhole from './MenuItemPizzaWhole'

const MenuItemPizzaView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const nestedMap = {
  LEFT: '1st Half',
  RIGHT: '2nd Half',
  WHOLE: 'Whole Pizza',
}

const makeNestedLookup = (options) => {
  return Object.entries(nestedMap).reduce((obj, [k, v]) => {
    const option = options.find((i) => i.name === v)
    if (!option) return obj
    return { ...obj, [k]: option.id }
  }, {})
}

const toggleOption = (groups, groupId, optionId) => {
  return groups.map((group) => {
    if (group.id === groupId) {
      const options = group.options.map((option) => {
        const newQuantity = option.id === optionId ? 1 : 0
        return { ...option, quantity: newQuantity }
      })
      return { ...group, options }
    }
    return group
  })
}

const removeOption = (groups, groupId) => {
  return groups.map((group) => {
    if (group.id === groupId) {
      const options = group.options.map((option) => {
        return { ...option, quantity: 0 }
      })
      return { ...group, options }
    }
    return group
  })
}

const MenuItemPizza = ({ groups, adjust }) => {
  const pizzaGroup = groups.find((g) => g.isPizza)
  if (!pizzaGroup) return null
  const groupId = pizzaGroup.id
  const nestedLookup = makeNestedLookup(pizzaGroup.options)
  const selected = pizzaGroup.options.find((i) => i.quantity === 1)
  const selectedId = selected ? selected.id : null
  // console.log(pizzaGroup.options.map((i) => `${i.name} x ${i.quantity}`))

  const handleOption = (optionId) => {
    if (selectedId === optionId) {
      const adjustedGroups = removeOption(groups, groupId)
      adjust(0, adjustedGroups)
    } else {
      const adjustedGroups = toggleOption(groups, groupId, optionId)
      adjust(1, adjustedGroups)
    }
  }

  return (
    <MenuItemPizzaView>
      <MenuItemPizzaLeft
        onClick={() => handleOption(nestedLookup.LEFT)}
        isSelected={selectedId === nestedLookup.LEFT}
      />
      <MenuItemPizzaWhole
        onClick={() => handleOption(nestedLookup.WHOLE)}
        isSelected={selectedId === nestedLookup.WHOLE}
      />
      <MenuItemPizzaRight
        onClick={() => handleOption(nestedLookup.RIGHT)}
        isSelected={selectedId === nestedLookup.RIGHT}
      />
    </MenuItemPizzaView>
  )
}

MenuItemPizza.displayName = 'MenuItemPizza'
MenuItemPizza.propTypes = {
  groups: propTypes.array,
  adjust: propTypes.func,
}

export default MenuItemPizza
