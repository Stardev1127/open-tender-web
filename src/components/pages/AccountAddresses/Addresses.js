import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  updateCustomerAddress,
  removeCustomerAddress,
  setAddress,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled, Preface } from '@open-tender/components'
import { openModal } from '../../../slices'
import { LinkSeparator, OrderAddress, Row } from '../..'

const Addresses = ({ addresses, isLoading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleEdit = (address) => {
    dispatch(openModal({ type: 'address', args: { address } }))
  }

  const handleDefault = (address) => {
    const data = { ...address, is_default: true }
    const addressId = address.customer_address_id
    delete data.customer_address_id
    delete data.created_at
    delete data.last_used_at
    dispatch(updateCustomerAddress(addressId, data))
  }

  const handleDelete = (address) => {
    const addressId = address.customer_address_id
    dispatch(removeCustomerAddress(addressId))
  }

  const handleReorder = (address) => {
    dispatch(setAddress(address))
    navigate('/order-type')
  }

  return (
    <div>
      {addresses.map((address) => {
        let preface = []
        if (address.description) preface.push(address.description)
        if (address.is_default) preface.push('Default')
        return (
          <Row
            key={address.customer_address_id}
            content={
              <>
                {preface.length > 0 && (
                  <Preface
                    size="xSmall"
                    color="tertiary"
                    style={{ display: 'inline-block', margin: '0 0 0.5rem' }}
                  >
                    {preface.join(' | ')}
                  </Preface>
                )}
                <OrderAddress address={address} isCard={true}>
                  <p>
                    <ButtonLink
                      onClick={() => handleEdit(address)}
                      disabled={isLoading}
                    >
                      edit
                    </ButtonLink>
                    <LinkSeparator />
                    <ButtonLink
                      onClick={() => handleDefault(address)}
                      disabled={address.is_default || isLoading}
                    >
                      make primary
                    </ButtonLink>
                    <LinkSeparator />
                    <ButtonLink
                      onClick={() => handleDelete(address)}
                      disabled={isLoading}
                    >
                      remove
                    </ButtonLink>
                  </p>
                </OrderAddress>
              </>
            }
            actions={
              <ButtonStyled
                onClick={() => handleReorder(address)}
                size="small"
                disabled={isLoading}
              >
                Order from here
              </ButtonStyled>
            }
          />
        )
      })}
    </div>
  )
}

Addresses.displayName = 'Addresses'
Addresses.propTypes = {
  addresses: propTypes.array,
  isLoading: propTypes.bool,
}
export default Addresses
