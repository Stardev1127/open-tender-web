import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { selectNotifications } from '@open-tender/redux'

import Notification from './Notification'
import { useLocation } from 'react-router-dom'

const NotificationsView = styled('div')`
  position: fixed;
  z-index: 15;
  // bottom: 12rem;
  bottom: ${(props) => (props.isMenu ? '12rem' : props.theme.layout.padding)};
  right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    left: ${(props) => props.theme.layout.paddingMobile};
    right: auto;
    bottom: ${(props) => props.theme.layout.paddingMobile};
  }
`

const Notifications = () => {
  const { pathname } = useLocation()
  const messages = useSelector(selectNotifications)
  // const messages = [
  //   { id: 1, message: 'Item added to cart' },
  //   { id: 2, message: 'Item added to cart' },
  // ]

  return (
    <NotificationsView isMenu={pathname.includes('menu')}>
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition key={message.id} classNames="flash" timeout={500}>
            <Notification {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </NotificationsView>
  )
}

Notifications.displayName = 'Notifications'

export default Notifications
