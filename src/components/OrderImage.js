import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const OrderImageView = styled('div')`
  width: 4.5rem;
  height: 4.5rem;
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  box-shadow: ${(props) => props.theme.boxShadow.outer};

  img {
    height: 4.5rem;
    width: auto;
    max-width: none;
  }
`

const OrderImage = ({ imageUrl, title }) => {
  return (
    <OrderImageView>
      <img src={imageUrl} title={title} alt={title} />
    </OrderImageView>
  )
}

OrderImage.displayName = 'OrderImage'
OrderImage.propTypes = {
  imageUrl: propTypes.string,
  title: propTypes.string,
}

export default OrderImage
