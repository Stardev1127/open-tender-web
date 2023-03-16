import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'

import { selectContent } from '../../../slices'
import CheckoutSection from './CheckoutSection'
import CheckoutButton from './CheckoutButton'

const CheckoutSurchargesView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutSurcharges = () => {
  const dispatch = useDispatch()
  const { check, form, loading } = useSelector(selectCheckout)
  const { checkout: config } = useSelector(selectContent)
  const [pendingSurcharge, setPendingSurcharge] = useState(null)
  const surchargeIds = form.surcharges.map((i) => i.id)

  useEffect(() => {
    if (loading !== 'pending') setPendingSurcharge(null)
  }, [loading])

  const surchargesOptional = check.config.surcharges.length
    ? check.config.surcharges
    : null

  const applySurcharge = (surchargeId) => {
    setPendingSurcharge(surchargeId)
    const newSurcharge = { id: surchargeId }
    dispatch(updateForm({ surcharges: [...form.surcharges, newSurcharge] }))
    dispatch(validateOrder())
  }

  const removeSurcharge = (surchargeId) => {
    const filtered = form.surcharges.filter((i) => i.id !== surchargeId)
    dispatch(updateForm({ surcharges: filtered }))
    dispatch(validateOrder())
  }

  if (!surchargesOptional) return null

  return (
    <CheckoutSection title={config.surcharges.title}>
      <CheckoutSurchargesView>
        {surchargesOptional.map((i) => {
          const label = i.label || i.name
          const isApplied = surchargeIds.includes(i.id)
          const isPending = i.id === pendingSurcharge
          const onPress = isApplied
            ? () => removeSurcharge(i.id)
            : () => applySurcharge(i.id)
          const cost =
            parseFloat(i.amount) > 0
              ? `${formatDollars(i.amount)}`
              : 'no charge'
          return (
            <CheckoutButton
              key={i.id}
              title={`${label} (${cost})`}
              subtitle={i.description}
              onPress={isPending ? null : onPress}
              isApplied={isApplied}
              disabled={!i.is_optional}
            />
          )
        })}
      </CheckoutSurchargesView>
    </CheckoutSection>
  )
}

CheckoutSurcharges.displayName = 'CheckoutSurcharges'

export default CheckoutSurcharges
