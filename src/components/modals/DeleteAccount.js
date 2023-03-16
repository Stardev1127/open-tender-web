import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteCustomer } from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const DeleteAccountContent = styled.div`
  p {
    color: ${(props) => props.theme.colors.error};
  }

  button {
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.error};
    border-color: ${(props) => props.theme.colors.error};

    &:hover,
    &:active {
      color: ${(props) => props.theme.colors.light};
      background-color: ${(props) => props.theme.colors.dark};
      border-color: ${(props) => props.theme.colors.dark};
    }
  }
`

const DeleteAccountFooter = styled.div`
  justify-content: center !important;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const DeleteAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteAccount = () => {
    dispatch(deleteCustomer()).then(() => navigate(`/guest`))
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title="Delete Your Account"
        subtitle={
          <p>Are you sure you want to permanently delete your account?</p>
        }
        style={{ textAlign: 'center' }}
        footer={
          <DeleteAccountFooter>
            <ButtonLink onClick={cancel}>
              Nevermind, I'll keep my account
            </ButtonLink>
          </DeleteAccountFooter>
        }
      >
        <DeleteAccountContent>
          <p>
            This action is permanent and there is no undo. Please make sure you
            want to do this.
          </p>
          <ButtonStyled onClick={deleteAccount}>
            Yes, Delete My Account Forever
          </ButtonStyled>
        </DeleteAccountContent>
      </ModalContent>
    </ModalView>
  )
}

DeleteAccount.displayName = 'DeleteAccount'

export default DeleteAccount
