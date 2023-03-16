import { useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, selectOrder, updateForm } from '@open-tender/redux'
import { isEmpty, makeNumeric } from '@open-tender/js'
import { Input, Switch, Textarea } from '@open-tender/components'

import CheckoutInputs from './CheckoutInputs'

const CheckoutDetailsView = styled.div`
  margin-top: 1.5rem;
`

const initialState = {
  eating_utensils: false,
  serving_utensils: false,
  person_count: '',
  tax_exempt_id: '',
  notes: '',
}

const makeDetailsConfig = (required, displayed, allowTaxExempt) => {
  return {
    eating_utensils: {
      label: 'Include Eating Utensils',
      included:
        displayed.includes('eatingUtensils') ||
        required.includes('eatingUtensils'),
      required: required.includes('eatingUtensils'),
    },
    serving_utensils: {
      label: 'Include Serving Utensils',
      included:
        displayed.includes('servingUtensils') ||
        required.includes('servingUtensils'),
      required: required.includes('servingUtensils'),
    },
    person_count: {
      label: `Person Count${!required.includes('count') ? ' (optional)' : ''}`,
      included: displayed.includes('count') || required.includes('count'),
      required: required.includes('count'),
    },
    tax_exempt_id: {
      label: 'Tax Exempt ID',
      included: allowTaxExempt,
      required: false,
    },
    notes: {
      label: `Notes${!required.includes('notes') ? ' (optional)' : ''}`,
      included: displayed.includes('notes') || required.includes('notes'),
      required: required.includes('notes'),
    },
  }
}

const switches = [
  { name: 'eating_utensils', type: 'switch' },
  { name: 'serving_utensils', type: 'switch' },
]

const inputs = [
  { name: 'person_count', type: 'number', pattern: '[0-9]*', min: 0 },
  { name: 'tax_exempt_id', type: 'text' },
  // { name: 'notes', type: 'text' },
]

const makeCheckDetails = (details) => {
  return Object.entries(details).reduce((obj, [key, value]) => {
    return {
      ...obj,
      [key]: key === 'person_count' ? value && value.toString() : value,
    }
  }, {})
}

const CheckoutDetails = ({ hasAddress }) => {
  const dispatch = useDispatch()
  const { orderType } = useSelector(selectOrder)
  const { check, form, errors } = useSelector(selectCheckout)
  const allowTaxExempt = check.config.allow_tax_exempt
  const required = check.config.required.details || []
  const displayed = check.config.displayed
    ? check.config.displayed.details || []
    : []
  const detailsConfig = makeDetailsConfig(required, displayed, allowTaxExempt)
  const detailsErrors = errors.details || {}
  const filteredSwitches = switches.filter((field) => {
    const input = detailsConfig[field.name]
    return input && input.included ? true : false
  })
  const filteredInputs = inputs.filter((field) => {
    const input = detailsConfig[field.name]
    return input && input.included ? true : false
  })
  const notesConfig = detailsConfig['notes']
  const showNotes = notesConfig && notesConfig.included ? true : false
  const formDetails = useMemo(() => form.details, [form.details])
  const { notes, person_count, tax_exempt_id } = check.details

  useEffect(() => {
    if (!formDetails || isEmpty(formDetails)) {
      if (check.details) {
        const checkDetails = makeCheckDetails(check.details)
        dispatch(updateForm({ details: checkDetails }))
      } else {
        dispatch(updateForm({ details: initialState }))
      }
    }
  }, [formDetails, check.details, dispatch, orderType])

  useEffect(() => {
    if (!isEmpty(formDetails)) {
      let updated = {}
      if (!formDetails.notes && formDetails.notes !== '' && notes) {
        updated = { ...updated, notes }
      }
      if (
        !formDetails.person_count &&
        formDetails.person_count !== null &&
        person_count
      ) {
        updated = { ...updated, person_count: person_count.toString() }
      }
      if (!formDetails.tax_exempt_id && tax_exempt_id) {
        updated = { ...updated, tax_exempt_id }
      }
      if (!isEmpty(updated)) {
        dispatch(updateForm({ details: { ...formDetails, ...updated } }))
      }
    }
  }, [formDetails, notes, person_count, tax_exempt_id, dispatch])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const val =
      type === 'checkbox'
        ? checked
        : id === 'person_count'
        ? makeNumeric(value) || null
        : value
    const details = { ...formDetails, [id]: val }
    dispatch(updateForm({ details }))
  }

  if (!filteredSwitches.length && !filteredInputs.length && !showNotes)
    return null

  return (
    <CheckoutDetailsView hasAddress={hasAddress}>
      <CheckoutInputs>
        {filteredInputs.map((field) => {
          const input = detailsConfig[field.name]
          return (
            <Input
              key={field.name}
              label={input.label}
              name={field.name}
              type={field.type}
              value={formDetails[field.name] || ''}
              onChange={handleChange}
              error={detailsErrors[field.name]}
              required={input.required}
              pattern={field.pattern}
              min={field.min}
            />
          )
        })}
        {filteredSwitches.map((field) => {
          const input = detailsConfig[field.name]
          return (
            <Switch
              key={field.name}
              label={input.label}
              id={field.name}
              on={formDetails[field.name]}
              onChange={handleChange}
            />
          )
        })}
        {showNotes && (
          <Textarea
            label={notesConfig.label}
            name="notes"
            value={formDetails['notes'] || ''}
            onChange={handleChange}
            error={detailsErrors['notes']}
            required={notesConfig.required}
            style={{ width: '100%', margin: '1rem 0 0' }}
          />
        )}
      </CheckoutInputs>
    </CheckoutDetailsView>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'
CheckoutDetails.propTypes = {
  hasAddress: propTypes.bool,
}

export default CheckoutDetails
