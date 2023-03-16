import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import {
  selectCustomerFavorites,
  selectMenuItems,
  showNotification,
  addItemToCart,
} from '@open-tender/redux'
import { displayPrice, rehydrateOrderItem } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'
import { Favorite } from './buttons'
import { Card } from '.'

const OrderCardItemImageView = styled('div')`
  div {
    width: 100%;
    padding: 33.33333%;
    margin: 0 0 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const OrderCardItemImage = ({ bgStyle, names }) => (
  <OrderCardItemImageView>
    {bgStyle && <div style={bgStyle} />}
    <p>{names}</p>
  </OrderCardItemImageView>
)

const OrderCardItem = ({ item }) => {
  const dispatch = useDispatch()
  const { lookup } = useSelector(selectCustomerFavorites)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const { name, groups, quantity, totalPrice, imageUrl, signature } = item
  const price = totalPrice ? `$${displayPrice(totalPrice / quantity)}` : null
  const favoriteId = lookup[signature] || null
  const optionNames = groups
    .reduce((arr, group) => {
      const names = group.options.map((o) => o.name)
      return [...arr, ...names]
    }, [])
    .join(', ')
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null

  const addToCart = (item) => {
    const menuItem = menuItems.find((i) => i.id === item.id)
    if (!menuItem) {
      dispatch(showNotification('Item not currently available'))
    } else {
      const orderItem = rehydrateOrderItem(menuItem, item)
      dispatch(addItemToCart(orderItem))
      dispatch(showNotification('Item added to cart!'))
    }
  }

  return (
    <Card
      preface={price}
      title={name}
      content={<OrderCardItemImage bgStyle={bgStyle} names={optionNames} />}
      footer={
        <>
          <ButtonStyled onClick={() => addToCart(item)} size="small">
            Add To Order
          </ButtonStyled>
          <Favorite item={item} favoriteId={favoriteId} />
        </>
      }
    />
  )
}

OrderCardItem.displayName = 'OrderCardItem'
OrderCardItem.propTypes = {
  item: propTypes.object,
}

export default OrderCardItem
