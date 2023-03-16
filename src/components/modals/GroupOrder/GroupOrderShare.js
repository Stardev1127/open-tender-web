import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectGroupOrder,
  resetGroupOrder,
  removeCustomerGroupOrder,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { closeModal } from '../../../slices'
import { ModalContent } from '../../Modal'
import { GroupOrderLink, GroupOrderTime } from '../..'

const GroupOrderShare = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, cartId } = useSelector(selectGroupOrder)

  const proceed = () => {
    navigate('/review')
    dispatch(closeModal())
  }

  const backToMenu = () => {
    dispatch(closeModal())
  }

  const save = () => {
    dispatch(resetGroupOrder())
    dispatch(closeModal())
  }

  const cancel = () => {
    dispatch(removeCustomerGroupOrder(cartId))
    dispatch(closeModal())
  }

  return (
    <ModalContent
      title="Spread the love!"
      subtitle={
        <p>
          Share the link below with your friends so they can add their orders
        </p>
      }
      footer={
        <>
          <p>
            Change your mind? Save this order for later or cancel it altogether.
          </p>
          <div>
            <ButtonStyled onClick={save} color="secondary" size="small">
              Save for Later
            </ButtonStyled>
            <ButtonStyled onClick={cancel} color="secondary" size="small">
              Delete Forever
            </ButtonStyled>
          </div>
        </>
      }
    >
      <div>
        <GroupOrderLink token={token} />
        <GroupOrderTime />
        <p>
          Once you've added your own items, proceed to the next page to review
          the orders that have been submitted by others.
        </p>
        <p>
          <ButtonStyled onClick={proceed}>Review All Orders</ButtonStyled>
          <ButtonStyled onClick={backToMenu} color="secondary">
            Back To Menu
          </ButtonStyled>
        </p>
      </div>
    </ModalContent>
  )
}

GroupOrderShare.displayName = 'GroupOrderShare'

export default GroupOrderShare
