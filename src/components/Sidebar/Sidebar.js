import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { selectCartQuantity } from '@open-tender/redux'
import { contains } from '@open-tender/js'

import {
  selectModal,
  selectSidebar,
  selectSidebarModal,
  toggleSidebar,
} from '../../slices'
import SidebarOverlay from './SidebarOverlay'
import SidebarContent from './SidebarContent'

const Sidebar = () => {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const sidebarRef = useRef(null)
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const { type } = useSelector(selectModal)
  const { isOpen: sidebarModalOpen } = useSelector(selectSidebarModal)
  const { isOpen } = useSelector(selectSidebar)
  const cartQuantity = useSelector(selectCartQuantity)
  const showEmptyCart = contains(pathname, ['menu', 'checkout'])
  const hideCart =
    (cartQuantity === 0 && !showEmptyCart) ||
    contains(pathname, ['review', 'gift-cards'])
  const canToggle = !type && !hideCart && !sidebarModalOpen

  const handleExit = () => {
    if (active) active.focus()
  }

  const handleFocus = () => {
    setActive(document.activeElement)
    const allElements = sidebarRef.current.querySelectorAll(
      'a[href], button, input, select, textarea'
    )
    setElements(allElements)
    const activeElements = Array.from(allElements).filter((i) => !i.disabled)
    const lastElement = activeElements
      ? activeElements[activeElements.length - 1]
      : null
    if (lastElement) lastElement.focus()
  }

  const handleKeys = useCallback(
    (evt) => {
      if (evt.keyCode === 9 && sidebarRef.current && elements.length) {
        const activeElements = Array.from(elements).filter((i) => !i.disabled)
        const firstElement = activeElements[0]
        const lastElement = activeElements[activeElements.length - 1]

        if (!evt.shiftKey && document.activeElement === lastElement) {
          firstElement.focus()
          evt.preventDefault()
        }

        if (evt.shiftKey && document.activeElement === firstElement) {
          lastElement.focus()
          evt.preventDefault()
        }
      } else if (evt.keyCode === 27 && canToggle) {
        dispatch(toggleSidebar())
      }
    },
    [elements, canToggle, dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeys, false)
    return () => document.removeEventListener('keydown', handleKeys, false)
  }, [handleKeys])

  return (
    <>
      <SidebarOverlay />
      <TransitionGroup component={null}>
        {isOpen ? (
          <CSSTransition
            key="sidebar"
            classNames="sidebar"
            timeout={{ enter: 250, exit: 250 }}
            onEntered={handleFocus}
            onExited={handleExit}
          >
            <SidebarContent ref={sidebarRef} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
