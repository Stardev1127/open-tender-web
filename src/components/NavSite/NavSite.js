import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { selectNavSite, toggleNavSite } from '../../slices'
import NavSiteOverlay from './NavSiteOverlay'
import NavSiteContent from './NavSiteContent'

const NavSite = () => {
  const dispatch = useDispatch()
  const navRef = useRef(null)
  const [active, setActive] = useState(null)
  const [elements, setElements] = useState([])
  const { isOpen } = useSelector(selectNavSite)

  const handleExit = () => {
    if (active) active.focus()
  }

  const handleFocus = () => {
    setActive(document.activeElement)
    const allElements = navRef.current.querySelectorAll(
      'a[href], button, input, select, textarea'
    )
    setElements(allElements)
    const firstElement = allElements ? allElements[0] : null
    if (firstElement) firstElement.focus()
  }

  const handleKeys = useCallback(
    (evt) => {
      if (evt.keyCode === 9 && navRef.current && elements.length) {
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
      } else if (evt.keyCode === 27 && isOpen) {
        dispatch(toggleNavSite())
      }
    },
    [elements, isOpen, dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeys, false)
    return () => document.removeEventListener('keydown', handleKeys, false)
  }, [handleKeys])

  return (
    <>
      <NavSiteOverlay />
      <TransitionGroup component={null}>
        {isOpen ? (
          <CSSTransition
            key="sidebar"
            classNames="sidebar"
            timeout={{ enter: 250, exit: 250 }}
            onEntered={handleFocus}
            onExited={handleExit}
          >
            <NavSiteContent ref={navRef} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

NavSite.displayName = 'NavSite'

export default NavSite
