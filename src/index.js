import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'
import App from './App'
import * as Sentry from '@sentry/react'
import packageJson from '../package.json'

global.appVersion = packageJson.version

// https://docs.sentry.io/clients/javascript/config/
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  ignoreErrors: [
    'TypeError: Failed to fetch',
    'TypeError: NetworkError when attempting to fetch resource.',
    'TypeError: Cancelled',
    'TypeError: cancelled',
    'TypeError: Illegal invocation',
    'ReferenceError: fbq is not defined',
    "ReferenceError: Can't find variable: fbq",
    'Error: Extension context invalidated',
    'MapsRequestError',
    'Could not load "stats".',
    'Could not load "places_impl".',
    'Could not load "map".',
    'Could not load "util".',
    "Either header 'client-id' or 'origin' is required",
    'Object Not Found Matching',
    'Map: Expected mapDiv of type HTMLElement but was passed null.',
    "Can't find variable: adroll",
    'adroll is not defined',
  ],
})

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
