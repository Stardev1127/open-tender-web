import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, selectCustomer } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'
import { openModal } from '../../../slices'
import { AlertCircle } from '../../icons'

const makeCompanyConfig = (check) => {
  if (!check || !check.config) return {}
  let displayed = false,
    required = false
  try {
    displayed = check.config.displayed.customer.includes('company')
    required = check.config.required.customer.includes('company')
  } catch {
    // nothing to do here
  }
  return { displayed, required }
}

const CheckoutCompanyView = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.colors.error};

  span {
    display: block;
    margin: 0 0 0 0.5rem;
    color: ${(props) => props.theme.colors.error};
  }

  button {
    display: block;
    margin: 0 0 0 1rem;
    text-decoration: underline;
    color: ${(props) => props.theme.colors.error};
  }
`

const CheckoutCompany = ({ callback }) => {
  const dispatch = useDispatch()
  const { check } = useSelector(selectCheckout)
  const { profile } = useSelector(selectCustomer)
  const { company } = profile
  const { displayed, required } = makeCompanyConfig(check)

  const add = () => {
    dispatch(openModal({ type: 'profile', args: { callback } }))
  }

  if (!required) {
    return !displayed ? null : company ? <p>{company}</p> : null
  }

  return company ? (
    <p>{company}</p>
  ) : (
    <CheckoutCompanyView>
      <AlertCircle size={14} />
      <span>company required</span>
      <ButtonLink onClick={add}>add one</ButtonLink>
    </CheckoutCompanyView>
  )
}

CheckoutCompany.displayName = 'CheckoutCompany'
CheckoutCompany.propTypes = {
  updateCallback: propTypes.func,
}

export default CheckoutCompany
