import { useDispatch } from 'react-redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { openModal, closeModal } from '../../../slices'
import { ModalContent } from '../../Modal'

const GroupOrderGuest = () => {
  const dispatch = useDispatch()

  const login = (type) => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type }))
    }, 300)
  }

  return (
    <ModalContent
      title="Start a group order"
      footer={
        <div>
          <ButtonStyled
            color="secondary"
            onClick={() => dispatch(closeModal())}
          >
            Nevermind
          </ButtonStyled>
        </div>
      }
    >
      <div>
        <p>You must be logged into your accout to start a group order.</p>
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
    </ModalContent>
  )
}

GroupOrderGuest.displayName = 'GroupOrderGuest'

export default GroupOrderGuest
