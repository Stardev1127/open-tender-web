const makeProduct = (item) => {
  const { id, name, quantity, category, totalPrice } = item
  const price = (totalPrice / quantity).toFixed(2)
  return { id: id.toString(), name, quantity, category, price }
}

const makeProductClick = (item) => {
  const product = makeProduct(item)
  delete product.quantity
  return { ...product, position: item.menu_position }
}

const incrementProduct = (item) => {
  return {
    ...makeProduct(item),
    quantity: item.increment,
  }
}

const makeProducts = (cart) => {
  return cart.map((item) => {
    const { id, name, quantity, price_total } = item
    const price = (price_total / quantity).toFixed(2)
    return { id: id.toString(), name, quantity, price }
  })
}

const makeGtmEvent = ({ type, payload }) => {
  switch (type) {
    case 'order/setCurrentItem': {
      if (!payload || payload.index !== undefined) return null
      return {
        event: 'productClick',
        ecommerce: {
          currencyCode: 'USD',
          click: {
            actionField: { list: 'Menu' },
            products: [makeProductClick(payload)],
          },
        },
      }
    }
    case 'order/addItemToCart': {
      return {
        event: 'addToCart',
        ecommerce: {
          currencyCode: 'USD',
          add: {
            products: [makeProduct(payload)],
          },
        },
      }
    }
    case 'order/incrementItemInCart': {
      return {
        event: 'addToCart',
        ecommerce: {
          currencyCode: 'USD',
          add: {
            products: [incrementProduct(payload)],
          },
        },
      }
    }
    case 'order/removeItemToCart': {
      return {
        event: 'removeFromCart',
        ecommerce: {
          currencyCode: 'USD',
          remove: {
            products: [makeProduct(payload)],
          },
        },
      }
    }
    case 'order/decrementItemInCart': {
      return {
        event: 'removeFromCart',
        ecommerce: {
          currencyCode: 'USD',
          remove: {
            products: [incrementProduct(payload)],
          },
        },
      }
    }
    case 'order/checkout': {
      return {
        event: 'checkout',
        ecommerce: {
          checkout: {
            actionField: { step: 1 },
          },
        },
      }
    }
    case 'order/setAlert': {
      if (payload.type === 'signUp' || payload.type === 'login') {
        return {
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 2 },
            },
          },
        }
      }
      return null
    }
    case 'checkout/updateForm': {
      const { tenders } = payload || {}
      if (tenders && tenders.length) {
        return {
          event: 'checkout',
          ecommerce: {
            checkout: {
              actionField: { step: 4 },
            },
          },
        }
      }
      return null
    }
    case 'confirmation/setConfirmationOrder': {
      const { order_id, revenue_center, totals, cart } = payload
      const { tax, shipping, total } = totals
      return {
        event: 'purchase',
        ecommerce: {
          purchase: {
            actionField: {
              id: order_id.toString(),
              affiliation: revenue_center.name,
              revenue: total,
              tax: tax,
              shipping: shipping,
            },
            products: makeProducts(cart),
          },
        },
      }
    }
    default:
      return null
  }
}

export const analytics = () => (next) => (action) => {
  const event = makeGtmEvent(action)
  if (!event) return next(action)
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(event)
  return next(action)
}
