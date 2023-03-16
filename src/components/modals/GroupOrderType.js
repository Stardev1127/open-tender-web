import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, setOrderServiceType } from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { closeModal, openModal, setIsGroupOrder } from '../../slices'
import { ModalContent, ModalView } from '..'

const GroupOrderTypeView = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: block;
    width: 47.5%;
  }
`

const GroupOrderTypeFooter = styled.div`
  justify-content: center !important;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const GroupOrderType = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)

  const chooseOrderType = (serviceType) => {
    dispatch(setOrderServiceType('OLO', serviceType))
    dispatch(setIsGroupOrder(true))
    dispatch(closeModal())
    navigate(`/locations`)
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  const login = (type) => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type }))
    }, 300)
  }

  return (
    <ModalView>
      <ModalContent
        title={auth ? 'Choose group order type' : 'Account Required'}
        subtitle={
          auth ? <p>What time of group order would you like to place?</p> : null
        }
        style={{ textAlign: 'center' }}
        footer={
          <GroupOrderTypeFooter>
            <ButtonLink onClick={cancel}>
              Nevermind, cancel this group order
            </ButtonLink>
          </GroupOrderTypeFooter>
        }
      >
        {auth ? (
          <GroupOrderTypeView>
            <ButtonStyled onClick={() => chooseOrderType('PICKUP')}>
              Order Pickup
            </ButtonStyled>
            <ButtonStyled onClick={() => chooseOrderType('DELIVERY')}>
              Order Delivery
            </ButtonStyled>
          </GroupOrderTypeView>
        ) : (
          <>
            <div>
              <p>You must be logged into an accout to start a group order.</p>
              <p>
                <ButtonStyled onClick={() => login('login')} color="primary">
                  Click here to login
                </ButtonStyled>
              </p>
            </div>
            <div style={{ margin: '3rem 0 0' }}>
              <p>
                Don't have an account?{' '}
                <ButtonLink onClick={() => login('signUp')}>
                  Click here to create one.
                </ButtonLink>
              </p>
            </div>
          </>
        )}
      </ModalContent>
    </ModalView>
  )
}

GroupOrderType.displayName = 'GroupOrderType'

export default GroupOrderType
