import React from 'react'
import propTypes from 'prop-types'

const GroupOrderError = ({
  error,
  cartId,
  closed,
  pastCutoff,
  atCapacity,
  cartOwnerName,
}) => {
  return error && !cartId ? (
    <p>
      Please double check the link you were provided to make sure it's accurate.
    </p>
  ) : closed || pastCutoff ? (
    <p>
      Please get in touch with {cartOwnerName} to see if it's not too late to
      reopen it.
    </p>
  ) : atCapacity ? (
    <p>
      Please get in touch with {cartOwnerName} to see if they can possibly free
      up a spot.
    </p>
  ) : null
}

GroupOrderError.displayName = 'GroupOrderError'
GroupOrderError.propTypes = {
  error: propTypes.string,
  cartId: propTypes.number,
  closed: propTypes.bool,
  pastCutoff: propTypes.bool,
  atCapacity: propTypes.bool,
  cartOwnerName: propTypes.string,
}
export default GroupOrderError
