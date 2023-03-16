import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebar, toggleSidebar } from '../../slices'

const SidebarOverlayView = styled.div`
  position: fixed;
  z-index: 16;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const SidebarOverlay = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector(selectSidebar)
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition key="sidebar-overlay" classNames="overlay" timeout={250}>
          <SidebarOverlayView onClick={() => dispatch(toggleSidebar())} />
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

SidebarOverlay.displayName = 'SidebarOverlay'

export default SidebarOverlay
