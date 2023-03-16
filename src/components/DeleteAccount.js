import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../slices'

const DeleteAccountView = styled.div`
  text-align: center;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
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

const DeleteAccount = () => {
  const dispatch = useDispatch()

  const openDelete = () => {
    dispatch(openModal({ type: 'deleteAccount' }))
  }

  return (
    <DeleteAccountView>
      <ButtonStyled onClick={openDelete}>Delete Your Account</ButtonStyled>
    </DeleteAccountView>
  )
}

export default DeleteAccount
