import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { formatDollars, formatQuantity } from '@open-tender/js'
import { ButtonStyled, Checkmark, Input } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutTipButton from './CheckoutTipButton'

const CheckoutTipView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutTipOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 -0.5rem;
`

const CheckoutTipCustom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 0 0;
`

const CheckoutTipCustomInput = styled.div`
  position: relative;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 2rem 0 0;
`
const CheckoutTipCustomCheckmark = styled.div`
  position: absolute;
  top: 0;
  right: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CheckoutTipCustomButton = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`

const percentages = [10.0, 15.0, 18.0, 20.0]

const makeTipOptions = (options) => {
  return options.filter((i) => percentages.includes(parseFloat(i.percent)))
}

const CheckoutTip = () => {
  const dispatch = useDispatch()
  const { check, form, loading } = useSelector(selectCheckout)
  const tipSettings = check.config.gratuity
  const { has_tip, options } = tipSettings
  const tipOptions = makeTipOptions(options)
  const initialTip =
    form.tip && !tipOptions.find((i) => i.amount === form.tip) ? form.tip : null
  const [customTip, setCustomTip] = useState(initialTip)
  const customTipApplied = customTip && customTip === check.totals.tip

  useEffect(() => {
    if (has_tip && !form.tip && loading !== 'pending') {
      setCustomTip('')
      dispatch(updateForm({ tip: check.totals.tip }))
    }
  }, [has_tip, form.tip, loading, check.totals.tip, dispatch])

  if (!has_tip) return null

  const chooseTip = (amount) => {
    setCustomTip('')
    dispatch(updateForm({ tip: amount }))
    dispatch(validateOrder())
  }

  const handleCustomTip = (txt) => {
    setCustomTip(txt)
  }

  const applyCustomTip = () => {
    const formatted = parseFloat(customTip).toFixed(2)
    setCustomTip(formatted)
    dispatch(updateForm({ tip: formatted }))
    dispatch(validateOrder())
  }

  return (
    <CheckoutSection title="Add a Tip">
      <CheckoutTipView>
        <CheckoutTipOptions>
          {tipOptions.map((i) => {
            const isApplied = !customTip && form.tip === i.amount
            return (
              <CheckoutTipButton
                key={`${i.percent}-${i.amount}`}
                title={`${formatQuantity(i.percent)}%`}
                subtitle={formatDollars(i.amount)}
                onPress={isApplied ? null : () => chooseTip(i.amount)}
                isApplied={isApplied}
                disabled={isApplied}
              />
            )
          })}
        </CheckoutTipOptions>
        <CheckoutTipCustom>
          <CheckoutTipCustomInput>
            <Input
              label="Enter custom tip"
              name="custom_tip"
              type="number"
              value={customTip || ''}
              onChange={(evt) => handleCustomTip(evt.target.value)}
              style={{ margin: 0 }}
            />
            {customTipApplied && (
              <CheckoutTipCustomCheckmark>
                <Checkmark />
              </CheckoutTipCustomCheckmark>
            )}
          </CheckoutTipCustomInput>
          <CheckoutTipCustomButton>
            <ButtonStyled
              onClick={applyCustomTip}
              disabled={!customTip || customTipApplied}
              size="small"
              color="secondary"
            >
              Apply
            </ButtonStyled>
          </CheckoutTipCustomButton>
        </CheckoutTipCustom>
      </CheckoutTipView>
    </CheckoutSection>
  )
}

CheckoutTip.displayName = 'CheckoutTip'

export default CheckoutTip
