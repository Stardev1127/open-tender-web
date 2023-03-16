import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideNotification } from '@open-tender/redux'
import styled from '@emotion/styled'

const NotificationView = styled('li')`
  display: block;
  float: right;
  clear: right;
  margin: 1.5rem 0 0;
  line-height: 1.2;
  padding: 0.8rem 1.6rem;
  transition: all 500ms ease;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.border.radiusSmall};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.toast.color};
  background-color: ${(props) => props.theme.toast.bgColor};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    float: left;
    clear: left;
  }
`

const Notification = ({ message, id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(hideNotification(id))
    }, 3000)
    return () => clearTimeout(timer)
  }, [dispatch, id])

  return <NotificationView>{message}</NotificationView>
}

Notification.displayName = 'Notification'
Notification.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Notification
