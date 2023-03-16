import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomerLevelUp,
  removeCustomerLevelUp,
  fetchCustomerLevelUp,
  showNotification,
} from '@open-tender/redux'
import { ButtonLink, ButtonStyled } from '@open-tender/components'
import { openModal } from '../../../slices'
import { Loading, PageContent, Row } from '../..'

const LevelUpConnect = () => {
  const [checking, setChecking] = useState(false)
  const dispatch = useDispatch()
  const { levelup, loading } = useSelector(selectCustomerLevelUp)
  const isLoading = loading === 'pending'
  const status = levelup ? levelup.status : null

  useEffect(() => {
    if (loading === 'idle' && checking) {
      const msg = status === 'PENDING' ? 'Still pending' : 'Account connected!'
      dispatch(showNotification(msg))
      setChecking(false)
    }
  }, [loading, status, checking, dispatch])

  const handleDisconnect = () => {
    dispatch(removeCustomerLevelUp(levelup.levelup_connect_id))
  }

  const handleConnect = () => {
    dispatch(openModal({ type: 'levelup' }))
  }

  const handleCheckStatus = () => {
    setChecking(true)
    dispatch(fetchCustomerLevelUp())
  }

  return (
    <PageContent style={{ maxWidth: '76.8rem' }}>
      {isLoading ? (
        <Loading text="Retrieving your LevelUp account status..." />
      ) : levelup ? (
        levelup.status === 'ACCEPTED' ? (
          <Row
            content={
              <div style={{ marginRight: '2rem', textAlign: 'left' }}>
                <p>Account connected!</p>
                <p>
                  Your LevelUp account is currently connected via your{' '}
                  <span>{levelup.email}</span> email address. If you need to
                  change this, disconnect your account and then connect it
                  again.
                </p>
              </div>
            }
            actions={
              <ButtonStyled
                onClick={handleDisconnect}
                size="small"
                disabled={isLoading}
              >
                Disconnect
              </ButtonStyled>
            }
          />
        ) : (
          <Row
            content={
              <>
                <p>Account Connection Pending</p>
                <p>
                  A LevelUp connection request was sent to your{' '}
                  <span>{levelup.email}</span> email address. Please check your
                  inbox and accept the connection request, and then come back
                  here (sometimes it can take a few minutes to receive an email
                  from LevelUp).{' '}
                </p>
                <p>
                  If you didn't receive an email from LevelUp or if the
                  connection request expired, please use the button to the right
                  to give it another try.
                </p>
                <p>
                  Already accepted the connection request?{' '}
                  <ButtonLink onClick={handleCheckStatus} disabled={isLoading}>
                    Click here to check your connection status.
                  </ButtonLink>
                </p>
              </>
            }
            actions={
              <ButtonStyled
                onClick={handleConnect}
                size="small"
                disabled={isLoading}
              >
                Connect Again
              </ButtonStyled>
            }
          />
        )
      ) : (
        <>
          <p>
            <ButtonStyled onClick={handleConnect}>
              Connect your LevelUp account
            </ButtonStyled>
          </p>
          <p>
            Don't have a LevelUp account?{' '}
            <a
              href="https://www.thelevelup.com/users/new"
              rel="noopener noreferrer"
              target="_blank"
            >
              Click here to create one.
            </a>
          </p>
        </>
      )}
    </PageContent>
  )
}

LevelUpConnect.displayName = 'LevelUpConnect'
export default LevelUpConnect
