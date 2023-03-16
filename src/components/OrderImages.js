import React from 'react'
import propTypes from 'prop-types'
import OrderImage from './OrderImage'
import styled from '@emotion/styled'

const OrderImagesView = styled('div')`
  margin: 1.5rem 0 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
  }
`

const OrderImagesList = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: top;
  margin: 0 0 1rem;
  overflow: hidden;
`

const OrderImages = ({ images, names }) => {
  return (
    <OrderImagesView>
      <OrderImagesList>
        {images.map((i, index) => (
          <OrderImage
            key={`${i.imageUrl}-${index}`}
            imageUrl={i.imageUrl}
            title={i.title}
          />
        ))}
      </OrderImagesList>
      <p>{names}</p>
    </OrderImagesView>
  )
}

OrderImages.displayName = 'OrderImages'
OrderImages.propTypes = {
  items: propTypes.array,
}

export default OrderImages
