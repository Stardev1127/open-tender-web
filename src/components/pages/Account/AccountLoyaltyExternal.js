import React from 'react'
import propTypes from 'prop-types'

import { LoyaltyProgram } from '../..'

const AccountLoyaltyExternal = ({ loyalty }) => {
  const { credit } = loyalty
  const extLoyalty = credit
    ? { ...loyalty, credit: { current: credit } }
    : loyalty

  return <LoyaltyProgram program={extLoyalty} />
}

AccountLoyaltyExternal.displayName = 'AccountLoyaltyExternal'
AccountLoyaltyExternal.propTypes = {
  loyalty: propTypes.object,
}

export default AccountLoyaltyExternal
