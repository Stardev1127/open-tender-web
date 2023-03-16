import React, { useContext } from 'react'
import styled from '@emotion/styled'

import { Loading } from '../..'
import { MenuContext } from './Menu'

const MenuLoadingView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 9rem 0 0;
  background-color: ${(props) => props.theme.overlay.light};
`

const MenuLoading = () => {
  const { isLoading, loadingMessage } = useContext(MenuContext)
  return isLoading ? (
    <MenuLoadingView>
      <Loading text={loadingMessage} />
    </MenuLoadingView>
  ) : null
}

MenuLoading.displayName = 'MenuLoading'

export default MenuLoading
