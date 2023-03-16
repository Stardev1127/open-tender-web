import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectSidebarModal } from '../../slices'
import SidebarModalOverlay from './SidebarModalOverlay'

const SidebarModal = ({ children }) => {
  const sidebarRef = useRef(null)
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const { isOpen } = useSelector(selectSidebarModal)

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
      }
    },
    [elements]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeys, false)
    return () => document.removeEventListener('keydown', handleKeys, false)
  }, [handleKeys])

  return (
    <>
      <SidebarModalOverlay />
      <TransitionGroup component={null}>
        {isOpen ? (
          <CSSTransition
            key="sidebar"
            classNames="sidebar"
            timeout={{ enter: 500, exit: 500 }}
            onEntered={handleFocus}
            onExited={handleExit}
          >
            {React.cloneElement(children, { ref: sidebarRef })}
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

SidebarModal.displayName = 'SidebarModal'

export default SidebarModal
