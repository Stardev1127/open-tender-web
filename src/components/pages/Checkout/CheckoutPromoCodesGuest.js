import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { ButtonLink, Text } from '@open-tender/components'

import { openModal, selectContent } from '../../../slices'
import CheckoutSection from './CheckoutSection'

const CheckoutPromoCodesGuestView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutPromoCodesGuest = () => {
  const dispatch = useDispatch()
  const { checkout: config } = useSelector(selectContent)

  const signUp = () => {
    dispatch(openModal({ type: 'signUp' }))
  }

  return (
    <CheckoutSection title={config.promoCodes.title}>
      <CheckoutPromoCodesGuestView>
        <Text size="small">
          Have a promo code?{' '}
          <ButtonLink
            onClick={signUp}
            size="small"
            underline={true}
            padding="3px 0 0"
          >
            Create an account to apply it.
          </ButtonLink>
        </Text>
      </CheckoutPromoCodesGuestView>
    </CheckoutSection>
  )
}

CheckoutPromoCodesGuest.displayName = 'CheckoutPromoCodesGuest'
CheckoutPromoCodesGuest.propTypes = {}

export default CheckoutPromoCodesGuest
