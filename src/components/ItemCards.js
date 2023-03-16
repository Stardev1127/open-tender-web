import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ItemCardsView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0 -0.5rem;
  }
`
const ItemCardsItem = styled('div')`
  width: 22rem;
  max-width: 100%;
  padding: 0 1rem;
  margin: 0 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: 50%;
    padding: 0 0.5rem;
  }
`

const ItemCards = ({ items, renderItem }) => {
  return (
    <ItemCardsView>
      {items.map((item, index) => {
        return (
          <ItemCardsItem key={`${item.id}-${index}`}>
            {renderItem({ item })}
          </ItemCardsItem>
        )
      })}
    </ItemCardsView>
  )
}

ItemCards.displayName = 'ItemCards'
ItemCards.propTypes = {
  items: propTypes.array,
  delay: propTypes.number,
  sequential: propTypes.bool,
  renderItem: propTypes.func,
}

export default ItemCards
