import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { addCustomerFavorite, removeCustomerFavorite } from '@open-tender/redux'
import { makeSimpleCart } from '@open-tender/js'
import { Heart } from './icons'

const MenuItemFavoriteView = styled.button`
  padding: 0.5rem;
  opacity: ${(props) => (props.disabled ? '0.2' : '1')};
`

const MenuItemFavoriteContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemFavorite = ({ builtItem, favoriteId, disabled, size }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isFavorite, setIsFavorite] = useState(favoriteId ? true : false)
  const color = isFavorite ? theme.colors.primary : theme.colors.primary
  const fill = isFavorite ? theme.colors.primary : theme.bgColors.primary

  useEffect(() => setIsFavorite(favoriteId ? true : false), [favoriteId])

  const addFavorite = (evt) => {
    evt.preventDefault()
    setIsFavorite(true)
    const cart = makeSimpleCart([builtItem])[0]
    delete cart.quantity
    dispatch(addCustomerFavorite({ cart }))
  }

  const removeFavorite = (evt) => {
    evt.preventDefault()
    setIsFavorite(false)
    dispatch(removeCustomerFavorite(favoriteId))
  }

  return (
    <MenuItemFavoriteView
      disabled={disabled}
      onClick={favoriteId ? removeFavorite : addFavorite}
    >
      <MenuItemFavoriteContainer>
        <Heart size={size ?? 26} color={color} fill={fill} />
      </MenuItemFavoriteContainer>
    </MenuItemFavoriteView>
  )
}

MenuItemFavorite.displayName = 'MenuItemFavorite'
MenuItemFavorite.propTypes = {
  builtItem: propTypes.object,
  favoriteId: propTypes.number,
  disabled: propTypes.bool,
  size: propTypes.number,
}

export default MenuItemFavorite
