import { useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, selectOrder, updateForm } from '@open-tender/redux'
import { isEmpty, makePhone } from '@open-tender/js'
import { Input } from '@open-tender/components'

import CheckoutInputs from './CheckoutInputs'

const CheckoutAddressView = styled.div`
  margin: 2.5rem 0 0;
`

const initialState = {
  unit: '',
  company: '',
  contact: '',
  phone: '',
}

const makeAddressConfig = (required, displayed) => {
  return {
    unit: {
      label: 'Apt/Unit/Suite',
      included: displayed.includes('unit') || required.includes('unit'),
      required: required.includes('unit'),
    },
    company: {
      label: 'Company',
      included: displayed.includes('company') || required.includes('company'),
      required: required.includes('company'),
    },
    contact: {
      label: 'Contact Person',
      included: displayed.includes('contact') || required.includes('contact'),
      required: required.includes('contact'),
    },
    phone: {
      label: 'Contact Phone',
      included: displayed.includes('phone') || required.includes('phone'),
      required: required.includes('phone'),
    },
  }
}

const fields = [
  { name: 'company', type: 'text' },
  { name: 'unit', type: 'text' },
  { name: 'contact', type: 'text' },
  { name: 'phone', type: 'text' },
]

const CheckoutAddress = () => {
  const dispatch = useDispatch()
  const { serviceType } = useSelector(selectOrder)
  const notDelivery = serviceType !== 'DELIVERY'
  const { check, form, errors } = useSelector(selectCheckout)
  const required = check.config.required.address || []
  const displayed = check.config.displayed
    ? check.config.displayed.address || []
    : []
  const addressConfig = makeAddressConfig(required, displayed)
  const addressErrors = errors.address || {}
  const emptyAddress = isEmpty(form.address) ? true : false
  const filtered = fields.filter((field) => {
    const input = addressConfig[field.name]
    return input && input.included ? true : false
  })

  useEffect(() => {
    if (notDelivery) {
      dispatch(updateForm({ address: {} }))
    } else if (emptyAddress) {
      if (check.address) {
        const checkAddress = {
          unit: check.address.unit || '',
          company: check.address.company || '',
          contact: check.address.contact || '',
          phone: check.address.phone || '',
        }
        dispatch(updateForm({ address: checkAddress }))
      } else {
        dispatch(updateForm({ address: initialState }))
      }
    }
  }, [emptyAddress, check.address, dispatch, notDelivery])

  if (!filtered.length || notDelivery) return null

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const val = id === 'phone' ? makePhone(value) : value
    const address = { ...form.address, [id]: val }
    dispatch(updateForm({ address }))
  }

  return (
    <CheckoutAddressView>
      <CheckoutInputs>
        {filtered.map((field) => {
          const input = addressConfig[field.name]
          const label = `${input.label}${!input.required ? ' (optional)' : ''}`
          return (
            <Input
              key={field.name}
              label={label}
              name={field.name}
              type={field.type}
              value={form.address[field.name] || ''}
              onChange={handleChange}
              error={addressErrors[field.name]}
              required={input.required}
            />
          )
        })}
      </CheckoutInputs>
    </CheckoutAddressView>
  )
}

CheckoutAddress.displayName = 'CheckoutAddress'
CheckoutAddress.propTypes = {}

export default CheckoutAddress
