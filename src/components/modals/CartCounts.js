import React from 'react'
import { useSelector } from 'react-redux'
import { selectCart } from '@open-tender/redux'
import { CartCounts as CartCountsComponent } from '@open-tender/components'

import { selectConfig } from '../../slices'
import { ModalContent, ModalView } from '..'

const CartCounts = ({ errors }) => {
  const { menu } = useSelector(selectConfig)
  const cart = useSelector(selectCart)

  return (
    <ModalView>
      <ModalContent
        title={menu.cartErrors.title}
        subtitle={<p>{menu.cartErrors.subtitle}</p>}
      >
        <CartCountsComponent cart={cart} errors={errors} />
      </ModalContent>
    </ModalView>
  )
}

CartCounts.displayName = 'CartCounts'

export default CartCounts
