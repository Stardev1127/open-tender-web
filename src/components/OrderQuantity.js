import React from 'react'
import propTypes from 'prop-types'
import { Favorite } from './buttons'
import styled from '@emotion/styled'

const OrderQuantityView = styled('div')`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 10rem;
  text-align: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-width: 7.5rem;
  }
`

const OrderQuantityCount = styled('div')`
  display: inline-block;
  padding: 0;
  text-align: center;
  width: ${(props) => props.theme.favorite.size};
  height: ${(props) => props.theme.favorite.size};
  border-radius: ${(props) => props.theme.favorite.size};
  line-height: ${(props) => props.theme.favorite.size};
  font-weight: ${(props) => props.theme.fonts.headings.weight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.buttons.colors.primary.color};
  background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
  border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};

  &:active,
  &:focus,
  &:disabled,
  &:read-only {
    color: ${(props) => props.theme.buttons.colors.primary.color};
    background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
    border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};
  }

  & + button {
    margin: 0 0 0 1.25rem;
  }
`

const OrderQuantity = ({ item, show, favoriteId }) => {
  return (
    <OrderQuantityView>
      <OrderQuantityCount>{item.quantity}</OrderQuantityCount>
      {show && <Favorite item={item} favoriteId={favoriteId} />}
    </OrderQuantityView>
  )
}

OrderQuantity.displayName = 'Order'
OrderQuantity.propTypes = {
  item: propTypes.object,
  show: propTypes.bool,
  favoriteId: propTypes.number,
  addFavorite: propTypes.func,
  removeFavorite: propTypes.func,
}
export default OrderQuantity
