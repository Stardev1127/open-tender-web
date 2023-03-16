import propTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { selectCheckout } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'
import { Loading } from '../..'
import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'
import CheckoutSectionTitle from './CheckoutSectionTitle'

const CheckoutGuest = () => {
  const navigate = useNavigate()
  const { form, check, loading } = useSelector(selectCheckout)
  const { first_name, last_name, email, phone } = form.customer

  const updateInfo = () => {
    navigate(email ? '/checkout/signup' : '/checkout/guest')
  }

  return check ? (
    <CheckoutSection title="Contact Info">
      <CheckoutSectionTitle>
        {first_name} {last_name}
      </CheckoutSectionTitle>
      {email && <p>{email}</p>}
      {phone && <p>{phone}</p>}
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={updateInfo}>Update your contact info</ButtonLink>
        </p>
      </CheckoutSectionFootnote>
    </CheckoutSection>
  ) : loading === 'pending' ? (
    <CheckoutSection>
      <Loading text="Loading..." style={{ textAlign: 'left' }} />
    </CheckoutSection>
  ) : null
}

CheckoutGuest.displayName = 'CheckoutGuest'
CheckoutGuest.propTypes = {
  errors: propTypes.object,
}

export default CheckoutGuest
