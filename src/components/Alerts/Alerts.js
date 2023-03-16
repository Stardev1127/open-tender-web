import React from 'react'
import { useSelector } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'
import { selectMessages } from '@open-tender/redux'

import Alert from './Alert'

const AlertsView = styled('div')`
  position: fixed;
  z-index: 15;
  top: ${(props) => props.theme.layout.navHeight};
  right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    right: ${(props) => props.theme.layout.paddingMobile};
  }
`

const Alerts = () => {
  const messages = useSelector(selectMessages)
  // const messages = [
  //   { id: 1, message: 'Requested time updated' },
  //   { id: 2, message: 'Requested time updated' },
  // ]

  return (
    <AlertsView>
      <TransitionGroup component={'ul'}>
        {messages.map((message) => (
          <CSSTransition
            key={message.id}
            classNames="flash-message"
            timeout={500}
          >
            <Alert {...message} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </AlertsView>
  )
}

Alerts.displayName = 'Alerts'

export default Alerts
