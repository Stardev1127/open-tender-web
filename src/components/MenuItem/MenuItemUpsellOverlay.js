import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const MenuItemUpsellOverlayView = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const MenuItemUpsellOverlay = ({ isOpen, cancel }) => {
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="sidebar-overlay" classNames="overlay" timeout={250}>
          <MenuItemUpsellOverlayView onClick={cancel} />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

MenuItemUpsellOverlay.displayName = 'MenuItemUpsellOverlay'

export default MenuItemUpsellOverlay
