import React from 'react'
import { useSelector } from 'react-redux'
import { selectCustomer, selectGroupOrderToken } from '@open-tender/redux'

import { ModalView } from '../..'
import GroupOrderGuest from './GroupOrderGuest'
import GroupOrderStart from './GroupOrderStart'
import GroupOrderShare from './GroupOrderShare'

const GroupOrder = () => {
  const { auth } = useSelector(selectCustomer)
  const token = useSelector(selectGroupOrderToken)

  return (
    <ModalView style={{ width: '60rem' }}>
      {token ? (
        <GroupOrderShare />
      ) : auth ? (
        <GroupOrderStart />
      ) : (
        <GroupOrderGuest />
      )}
    </ModalView>
  )
}

GroupOrder.displayName = 'GroupOrder'

export default GroupOrder
