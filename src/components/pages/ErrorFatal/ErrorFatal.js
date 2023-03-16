import React, { useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
import * as Sentry from '@sentry/react'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/react'

import {
  incrementRetries,
  selectConfigRetries,
  fetchConfig,
} from '../../../slices'
import { Loading } from '../..'

const makeStyles = () => css`
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    font-family: sans-serif;
    min-height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  ol,
  ul,
  legend {
    margin: 0;
    padding: 0;
  }
`

const LoadingContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FatalErrorView = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #fff;
  background-color: #640018;
  line-height: 1.5;
  font-size: 1.6rem;
  text-align: center;

  > div {
    width: 100%;
    max-width: 72rem;
    padding: 2rem;
  }

  h1 {
    line-height: 1;
  }

  p {
    font-size: 1.4rem;
    margin: 1em 0;

    strong {
      font-size: 1.8rem;
      font-weight: 600;
    }

    a {
      color: #fff;
      transition: all 0.15s ease;
      &:hover,
      &:active,
      &:focus {
        color: #000;
      }
    }
  }

  pre {
    overflow-x: scroll;
  }
`

const ErrorFatalPage = ({ error, loading }) => {
  const dispatch = useDispatch()
  const retries = useSelector(selectConfigRetries)
  const { status, title, detail, message } = error || {}
  const errMsg = detail || message || JSON.stringify(error)
  const is500 = Number.isInteger(status) && status >= 500
  const isLoading = loading === 'pending'
  const isRetrying = is500 && retries < 5
  const showLoading = isLoading || isRetrying
  const memoizedError = useMemo(() => error, [error])

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      if (is500 && retries < 5) {
        setTimeout(() => {
          dispatch(fetchConfig())
          dispatch(incrementRetries())
        }, 1000 * (retries + 1))
      } else if (memoizedError && status !== 403) {
        Sentry.withScope((scope) => {
          scope.setExtras(memoizedError)
          const errType = is500 ? '500' : 'Fatal'
          const err = new Error(`${errType} Error - ${errMsg}`)
          Sentry.captureException(err)
        })
      }
    }
  }, [errMsg, memoizedError, isLoading, is500, retries, dispatch, status])

  if (!showLoading && !error) return null

  return (
    <>
      <Global styles={makeStyles} />
      {showLoading ? (
        <LoadingContainer>
          <Loading type="Clip" size={32} />
        </LoadingContainer>
      ) : status === 403 ? (
        <FatalErrorView>
          <div>
            <h1>Inactive Merchant</h1>
            <p>
              This merchant account is no longer active. Please contact the
              restaurant brand if you think this is a mistake.
            </p>
          </div>
        </FatalErrorView>
      ) : error ? (
        <FatalErrorView>
          <div>
            <h1>Unsupported Browser</h1>
            <p>
              Hi, there. Unfortunately it looks like you're using an outdated,
              unsupported browser.
            </p>
            <p>
              <strong>
                Please try ordering on your phone, updating your browser to the
                latest version, or downloading the latest version of Google
                Chrome.
              </strong>
            </p>
            <p>
              If you've updated your browser and the issue persists, please
              contact Open Tender support at{' '}
              <a
                href="mailto:help@opentender.io"
                rel="noopener noreferrer"
                target="_blank"
              >
                help@opentender.io
              </a>{' '}
              and provide the details of the error message below.
            </p>
            <pre>
              <h2>{title}</h2>
              {errMsg}
            </pre>
          </div>
        </FatalErrorView>
      ) : null}
    </>
  )
}

ErrorFatalPage.displayName = 'ErrorFatalPage'
ErrorFatalPage.propTypes = {
  error: propTypes.object,
  loading: propTypes.string,
}
export default ErrorFatalPage
