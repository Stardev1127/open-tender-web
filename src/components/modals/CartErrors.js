import { useSelector, useDispatch } from 'react-redux'
import { fetchMenu, revertMenu, selectMenu, setCart } from '@open-tender/redux'
import { CartErrors as CartErrorsComponent } from '@open-tender/components'
import { closeModal, selectConfig } from '../../slices'
import { ModalContent, ModalView } from '..'

const CartErrors = () => {
  const dispatch = useDispatch()
  const { cartErrors, previousMenuVars, menuVars } = useSelector(selectMenu)
  const { newCart, errors } = cartErrors || {}
  const { menu } = useSelector(selectConfig)

  const handleRevert = (menuVars) => {
    dispatch(revertMenu(menuVars))
    dispatch(fetchMenu({ ...menuVars }))
    dispatch(closeModal())
  }

  const handleProceed = () => {
    dispatch(setCart(newCart))
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title={menu.cartErrors.title}
        subtitle={<p>{menu.cartErrors.subtitle}</p>}
      >
        <CartErrorsComponent
          newCart={newCart}
          errors={errors}
          revert={handleRevert}
          proceed={handleProceed}
          previousMenuVars={previousMenuVars}
          menuVars={menuVars}
        />
      </ModalContent>
    </ModalView>
  )
}

CartErrors.displayName = 'CartErrors'

export default CartErrors
