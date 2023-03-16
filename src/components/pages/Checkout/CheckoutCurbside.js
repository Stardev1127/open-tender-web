import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCheckout, updateForm } from '@open-tender/redux'
import { Input } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutInputs from './CheckoutInputs'

const CheckoutCurbsideView = styled.div`
  margin: 1.5rem 0 0;
`

const hasOrderFulfillment = (details) => {
  const values = Object.entries(details).reduce((arr, [key, value]) => {
    return key.startsWith('vehicle') ? [...arr, value] : arr
  }, [])
  const nonEmpty = values.filter((val) => val && val.length > 0)
  return nonEmpty.length ? true : false
}

const CheckoutCurbside = () => {
  const dispatch = useDispatch()
  const { check, form, errors } = useSelector(selectCheckout)
  const curbside = check.config.order_fulfillment
  const detailsErrors = errors.details || {}

  const handleChange = (name, value) => {
    const details = { ...form.details, [name]: value }
    const order_fulfillment = hasOrderFulfillment(details)
    dispatch(updateForm({ details: { ...details, order_fulfillment } }))
  }

  if (!curbside) return null

  return (
    <CheckoutSection
      title={curbside.title}
      subtitle={curbside.description}
      style={{ padding: '0' }}
    >
      <CheckoutCurbsideView>
        <CheckoutInputs>
          {curbside.fields.map((field, index) => {
            return (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                value={form.details[field.name] || ''}
                onChange={(evt) => handleChange(field.name, evt.target.value)}
                error={detailsErrors[field.name]}
              />
            )
          })}
        </CheckoutInputs>
      </CheckoutCurbsideView>
    </CheckoutSection>
  )
}

CheckoutCurbside.displayName = 'CheckoutCurbside'

export default CheckoutCurbside
