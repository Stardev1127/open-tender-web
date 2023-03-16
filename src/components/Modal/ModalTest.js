import { ButtonStyled } from '@open-tender/components'
import { useDispatch } from 'react-redux'
import { openModal } from '../../slices'

const ModalTest = ({ type, args }) => {
  const dispatch = useDispatch()
  return (
    <ButtonStyled onClick={() => dispatch(openModal({ type, args }))}>
      Test Modal
    </ButtonStyled>
  )
}

export default ModalTest
