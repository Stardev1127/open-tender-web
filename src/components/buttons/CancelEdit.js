import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, resetOrder, resetCheckout } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { XCircle } from '../icons'
import styled from '@emotion/styled'

const CancelEditView = styled.div`
  button {
    color: ${(props) => props.theme.colors.error};
  }
`

const CancelEdit = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orderId } = useSelector(selectOrder)

  const cancel = () => {
    dispatch(resetOrder())
    dispatch(resetCheckout())
    navigate(`/account`)
  }

  if (!orderId) return null

  return (
    <CancelEditView>
      <ButtonStyled
        icon={<XCircle />}
        onClick={cancel}
        size="header"
        color="header"
      >
        Cancel Edit
      </ButtonStyled>
    </CancelEditView>
  )
}

CancelEdit.displayName = 'CancelEdit'

export default CancelEdit
