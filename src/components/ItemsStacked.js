import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ItemsStackedView = styled('div')`
  margin: -0.5rem;
  display: flex;
  flex-wrap: wrap;
`

const ItemsStackedItem = styled('div')`
  width: 50%;
  padding: 0.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
  }
`

const ItemsStacked = ({ items, renderItem, children }) => {
  const hasItems = items ? items.length > 0 : false

  return hasItems ? (
    <ItemsStackedView>
      {items.map((item) => (
        <ItemsStackedItem key={item.key}>
          {renderItem({ item })}
        </ItemsStackedItem>
      ))}
    </ItemsStackedView>
  ) : (
    children
  )
}

ItemsStacked.displayName = 'ItemsStacked'
ItemsStacked.propTypes = {
  items: propTypes.array,
  renderItem: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default ItemsStacked
