import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../slices'
import { Reward, ScrollableSection } from '.'

const Deals = () => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { account: config } = useSelector(selectConfig)
  const { title } = config.deals
  const { profile } = useSelector(selectCustomer)
  const { entities } = useSelector(selectDeals)
  const { customer_id } = profile || {}
  const displayed = !isMobile ? entities.slice(0, 2) : entities
  const isMore = entities.length > 2
  const hasDeals = has_deals && displayed.length

  useEffect(() => {
    if (has_deals) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, dispatch])

  if (!hasDeals) return null

  return (
    <ScrollableSection
      title={title}
      to={isMore ? '/deals' : null}
      items={displayed}
      renderItem={Reward}
      keyName="discount_id"
    />
  )
}

Deals.displayName = 'Deals'
export default Deals
