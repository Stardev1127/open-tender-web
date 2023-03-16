import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { selectCurrentItem, setCurrentItem } from '@open-tender/redux'
import { closeModal } from '../../slices'
import { MenuItem } from '..'

const ItemModalView = styled.div`
  position: relative;
  width: 90%;
  max-width: ${(props) => props.theme.item.desktop.maxWidth};
  height: 90%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    max-width: ${(props) => props.theme.item.mobile.maxWidth};
    height: 100%;
    border-radius: 0;
  }
`

const ItemModalContent = styled.div`
  padding: 0;
  height: 100%;
  overflow: hidden;
`

const ItemModal = () => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)

  const cancel = useCallback(() => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }, [dispatch])

  if (!item) return null

  return (
    <ItemModalView>
      <ItemModalContent role="dialog" aria-labelledby="dialogTitle">
        <MenuItem cancel={cancel} />
      </ItemModalContent>
    </ItemModalView>
  )
}

ItemModal.displayName = 'ItemModal'

export default ItemModal
