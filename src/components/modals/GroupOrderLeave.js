import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  resetOrderType,
  resetGroupOrder,
  resetCheckout,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const GroupOrderLeaveFooter = styled.div`
  justify-content: center !important;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const GroupOrderLeave = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const leave = () => {
    dispatch(resetOrderType())
    dispatch(resetGroupOrder())
    dispatch(resetCheckout())
    navigate(`/guest`)
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title="Leave group order?"
        subtitle={
          <p>
            If you proceed, you'll need to rejoin thie group order and start
            over from scratch if you want to participate
          </p>
        }
        style={{ textAlign: 'center' }}
        footer={
          <GroupOrderLeaveFooter>
            <ButtonLink onClick={cancel}>
              Nevermind, I'll keep ordering
            </ButtonLink>
          </GroupOrderLeaveFooter>
        }
      >
        <ButtonStyled onClick={leave}>Leave Group Order</ButtonStyled>
      </ModalContent>
    </ModalView>
  )
}

GroupOrderLeave.displayName = 'GroupOrderLeave'

export default GroupOrderLeave
