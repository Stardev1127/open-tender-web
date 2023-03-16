import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, validateOrder } from '@open-tender/redux'
import { ButtonLink, FormError, Text } from '@open-tender/components'

import { openModal } from '../../../slices'
import CheckoutButton from './CheckoutButton'
import { Grid } from '../../icons'

const CheckoutLevelUpView = styled.div``

const CheckoutLevelUpContent = styled.div`
  label: CheckoutLevelUpContent;

  margin: 0 0 2rem;

  p {
    margin: 0.5rem 0 0;
  }
`

const CheckoutLevelUp = ({ apply, remove, isPaid }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { check, form, errors } = useSelector(selectCheckout)
  const { tender_types } = check.config

  if (!tender_types.includes('LEVELUP')) return null

  const isCustomer = check.customer.customer_id
  const levelup = check.customer.levelup || {}
  const tender = { tender_type: 'LEVELUP' }
  const isApplied =
    form.tenders.filter((i) => i.tender_type === 'LEVELUP').length > 0
  const onPress = isApplied ? () => remove() : () => apply(tender)
  const disabled = isPaid && !isApplied
  const { email } = form.customer
  const errMsg =
    errors && errors.levelup ? Object.values(errors.levelup)[0] : null

  const connectLevelUp = () => {
    const validate = () => dispatch(validateOrder())
    dispatch(openModal({ type: 'levelup', args: { validate } }))
  }

  const signUp = () => {
    email
      ? navigate('/checkout/signup')
      : dispatch(openModal({ type: 'signUp' }))
  }

  return (
    <CheckoutLevelUpView>
      <FormError errMsg={errMsg} />
      {levelup.connected ? (
        <CheckoutButton
          icon={<Grid size={18} />}
          title="Pay with LevelUp"
          subtitle={`Currently connected via your ${levelup.email} email address`}
          onPress={onPress}
          isApplied={isApplied}
          disabled={disabled}
        />
      ) : isCustomer ? (
        <CheckoutLevelUpContent>
          <Text as="p" color="error">
            LevelUp Not Connected
          </Text>
          <Text as="p" size="small">
            Your LevelUp account is not currently connected so you cannot use
            LevelUp for payment.
            <ButtonLink onClick={connectLevelUp}>
              Click here to connect LevelUp
            </ButtonLink>{' '}
            or{' '}
            <a
              href="https://www.thelevelup.com/users/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              click here to create a LevelUp account
            </a>{' '}
            if you {"don't"} have one.
          </Text>
        </CheckoutLevelUpContent>
      ) : (
        <CheckoutLevelUpContent>
          <Text as="p" color="error">
            Account Required
          </Text>
          <Text as="p" size="small">
            In order to pay with LevelUp, you must first create an account and
            then connect your LevelUp account to your account here.{' '}
          </Text>
          <Text as="p" size="small">
            <ButtonLink onClick={signUp} label="Sign up for an account">
              Click here to sign up for an account.
            </ButtonLink>
          </Text>
        </CheckoutLevelUpContent>
      )}
    </CheckoutLevelUpView>
  )
}

CheckoutLevelUp.displayName = 'CheckoutLevelUp'
CheckoutLevelUp.propTypes = {
  apply: propTypes.func,
  remove: propTypes.func,
  isPaid: propTypes.bool,
}

export default CheckoutLevelUp
