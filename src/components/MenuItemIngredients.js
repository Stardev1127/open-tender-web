import propTypes from 'prop-types'
import {
  MenuItemNutritionView,
  MenuItemNutritionList,
} from './MenuItemNutrition'

const MenuItemIngredients = ({ ingredients }) => {
  return (
    <MenuItemNutritionView>
      <MenuItemNutritionList>
        <p>{ingredients}</p>
      </MenuItemNutritionList>
    </MenuItemNutritionView>
  )
}

MenuItemIngredients.displayName = 'MenuItemIngredients'
MenuItemIngredients.propTypes = {
  ingredients: propTypes.string,
}

export default MenuItemIngredients
