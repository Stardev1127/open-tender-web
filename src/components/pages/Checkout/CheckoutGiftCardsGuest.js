import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { useNavigate } from 'react-router-dom'
import { ButtonLink, Text } from '@open-tender/components'

import { openModal } from '../../../slices'

const CheckoutGiftCardsGuestView = styled.div``

const CheckoutGiftCardsGuest = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { form } = useSelector(selectCheckout)
  const { email } = form.customer

  const signUp = () => {
    email
      ? navigate('/checkout/signup')
      : dispatch(openModal({ type: 'signUp' }))
  }

  return (
    <CheckoutGiftCardsGuestView>
      <Text size="small">
        Have a gift card number?{' '}
        <ButtonLink
          onClick={signUp}
          size="small"
          underline={true}
          padding="3px 0 0"
        >
          Create an account to apply it.
        </ButtonLink>
      </Text>
    </CheckoutGiftCardsGuestView>
  )
}

CheckoutGiftCardsGuest.displayName = 'CheckoutGiftCardsGuest'
CheckoutGiftCardsGuest.propTypes = {}

export default CheckoutGiftCardsGuest
