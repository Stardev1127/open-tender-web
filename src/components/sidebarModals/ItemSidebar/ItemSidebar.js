import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCurrentItem, setCurrentItem } from '@open-tender/redux'
import { toggleSidebarModal } from '../../../slices'
import { MenuItem } from '../..'

const ItemSidebarView = styled.aside`
  position: fixed;
  z-index: 18;
  top: 0;
  bottom: 0;
  right: 0;
  width: ${(props) => props.theme.item.desktop.maxWidth};
  max-width: 100%;
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: ${(props) => props.theme.item.mobile.maxWidth};
  }

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }
`

const ItemSidebar = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const item = useSelector(selectCurrentItem)

  useEffect(() => {
    return () => dispatch(setCurrentItem(null))
  }, [dispatch])

  const cancel = useCallback(() => {
    dispatch(toggleSidebarModal())
    setTimeout(() => {
      dispatch(setCurrentItem(null))
    }, 275)
  }, [dispatch])

  if (!item) return null

  return (
    <ItemSidebarView ref={ref}>
      <div>
        <MenuItem cancel={cancel} />
      </div>
    </ItemSidebarView>
  )
})

ItemSidebar.displayName = 'ItemSidebar'

export default ItemSidebar
