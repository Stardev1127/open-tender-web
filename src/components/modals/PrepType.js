import { useDispatch, useSelector } from 'react-redux'
import { setPrepType, selectOrder } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView } from '..'

const PrepType = () => {
  const dispatch = useDispatch()
  const { prepType } = useSelector(selectOrder)

  const changePrepType = (prepType) => {
    dispatch(setPrepType(prepType))
    dispatch(closeModal())
  }

  return (
    <ModalView>
      <ModalContent
        title="Change your order type"
        footer={
          <div>
            <ButtonStyled
              onClick={() => changePrepType('EAT_HERE')}
              color={prepType === 'EAT_HERE' ? 'primary' : 'secondary'}
            >
              Eat Here
            </ButtonStyled>
            <ButtonStyled
              onClick={() => changePrepType('TAKE_OUT')}
              color={prepType === 'TAKE_OUT' ? 'primary' : 'secondary'}
            >
              Take Out
            </ButtonStyled>
          </div>
        }
      >
        <div>
          <p>Please choose an order type below.</p>
        </div>
      </ModalContent>
    </ModalView>
  )
}

PrepType.displayName = 'PrepType'

export default PrepType
