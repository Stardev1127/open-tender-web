import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'
import styled from '@emotion/styled'

const AllergenFormView = styled('div')`
  label {
    // padding: 1.25rem 0;

    & > span > span:last-of-type {
      text-align: right;
      line-height: 1;
    }
  }
`

const Allergens = () => {
  const dispatch = useDispatch()
  const brandAllergens = useSelector(selectAllergens)
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )
  const callback = useCallback(() => dispatch(closeModal()), [dispatch])

  return (
    <ModalView>
      <ModalContent
        title="Allergen Alerts"
        subtitle={<p>Selected allergens will be highlighted on the menu</p>}
      >
        <AllergenFormView>
          <AllergenForm
            allergens={brandAllergens.entities}
            selectedAllergens={brandAllergens.selectedAllergens}
            isLoading={false}
            error={null}
            setAllergens={setAllergens}
            updateAllergens={updateAllergens}
            callback={callback}
          />
        </AllergenFormView>
      </ModalContent>
    </ModalView>
  )
}

Allergens.displayName = 'Allergens'

export default Allergens
