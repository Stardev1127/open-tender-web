import React from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import * as Sentry from '@sentry/react'
import ErrorReport from './pages/ErrorReport'
import packageJson from '../../package.json'

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: '',
    errorInfo: null,
    eventId: null,
  }

  static propTypes = {
    children: propTypes.node.isRequired,
    user: propTypes.object,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    Sentry.withScope((scope) => {
      const extras = { version: packageJson.version, ...errorInfo }
      scope.setExtras(extras)
      if (this.props.user) scope.setUser(this.props.user)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  render() {
    const { hasError, error, errorInfo, eventId } = this.state
    return hasError ? (
      <ErrorReport error={error} errorInfo={errorInfo} eventId={eventId} />
    ) : (
      this.props.children
    )
  }
}

ErrorBoundary.displayName = 'ErrorBoundary'

export default connect(
  (state) => ({
    user: state.data ? state.data.customer.account.profile : null,
  }),
  {}
)(ErrorBoundary)
