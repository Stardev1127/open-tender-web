import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { addCustomerFavorite, removeCustomerFavorite } from '@open-tender/redux'
import { makeSimpleCart } from '@open-tender/js'
import { Heart } from '../icons'

const FavoriteView = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  text-align: center;
  width: ${(props) => props.theme.favorite.size};
  height: ${(props) => props.theme.favorite.size};
  color: ${(props) => props.theme.colors.primary};

  svg {
    fill: ${(props) => (props.filled ? props.theme.colors.primary : null)};
  }

  &:hover {
    color: ${(props) => props.theme.links.primary.color};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      color: ${(props) => props.theme.colors.primary};
    }

    svg {
      fill: ${(props) =>
        props.filled ? props.theme.links.primary.color : null};
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        fill: ${(props) => (props.filled ? props.theme.colors.primary : null)};
      }
    }
  }
`

const FavoriteIcon = styled.span`
  display: block;
  line-height: 0;
  width: ${(props) => props.theme.favorite.iconSize};
  height: ${(props) => props.theme.favorite.iconSize};
`

const Favorite = ({ item, favoriteId }) => {
  const dispatch = useDispatch()
  const [filled, setFilled] = useState()

  const handleAdd = (evt) => {
    evt.preventDefault()
    setFilled(true)
    const cart = makeSimpleCart([item])[0]
    delete cart.quantity
    const data = { cart }
    dispatch(addCustomerFavorite(data))
  }

  const handleRemove = (evt) => {
    evt.preventDefault()
    setFilled(false)
    dispatch(removeCustomerFavorite(favoriteId))
  }

  useEffect(() => {
    setFilled(favoriteId ? true : false)
  }, [favoriteId])

  return (
    <FavoriteView
      onClick={favoriteId ? handleRemove : handleAdd}
      aria-label={favoriteId ? 'Remove favorite' : 'Add favorite'}
      filled={filled}
    >
      <FavoriteIcon>
        <Heart />
      </FavoriteIcon>
    </FavoriteView>
  )
}

Favorite.displayName = 'Favorite'
Favorite.propTypes = {
  item: propTypes.object,
  favoriteId: propTypes.number,
  classes: propTypes.string,
}

export default Favorite
