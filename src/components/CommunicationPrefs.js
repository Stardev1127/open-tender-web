import { useCallback, useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  addCustomerCommunicationPreference,
  fetchCustomer,
  fetchCustomerCommunicationPreferences,
  removeCustomerCommunicationPreference,
  selectCustomer,
  selectCustomerCommunicationPreferences,
  setCustomerCommunicationDefaultPreferences,
} from '@open-tender/redux'
import {
  CommunicationPreferences,
  FormWrapper,
  Message,
} from '@open-tender/components'

import Loading from './Loading'
import { selectBrand } from '../slices'

const defaultPrefs = [
  { notification_area: 'ORDER', notification_channel: 'EMAIL' },
  { notification_area: 'ORDER', notification_channel: 'SMS' },
  { notification_area: 'RATING', notification_channel: 'EMAIL' },
  { notification_area: 'MARKETING', notification_channel: 'EMAIL' },
]

const CommunicationPrefsDefaults = styled.div`
  margin: 2rem 0;
  text-align: center;
`

const makeAreaTypes = (accepts_marketing, order_notifications) => {
  const areaTypes = ['ORDER', 'MARKETING', 'RATING']
  let removed = []
  if (!accepts_marketing) removed.push('MARKETING')
  if (!order_notifications) removed.push('ORDER')
  return areaTypes.filter((i) => !removed.includes(i))
}

const makeChannelTypes = (has_app, has_sms) => {
  const channelTypes = ['EMAIL', 'SMS', 'PUSH']
  let removed = []
  if (!has_sms) removed.push('SMS')
  if (!has_app) removed.push('PUSH')
  return channelTypes.filter((i) => !removed.includes(i))
}

const CommunicationPrefs = ({ style }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { has_app, has_sms, accepts_marketing, order_notifications } =
    useSelector(selectBrand)
  const { auth, profile } = useSelector(selectCustomer)
  const { is_notification_set } = profile || {}
  const [isSet, setIsSet] = useState(is_notification_set)
  const [isNew, setIsNew] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const {
    entities: prefs,
    loading,
    error,
  } = useSelector(selectCustomerCommunicationPreferences)
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const areaTypes = makeAreaTypes(accepts_marketing, order_notifications)
  const channelTypes = makeChannelTypes(has_app, has_sms)

  const add = useCallback(
    (area, channel) =>
      dispatch(addCustomerCommunicationPreference(area, channel)),
    [dispatch]
  )

  const remove = useCallback(
    (prefId) => dispatch(removeCustomerCommunicationPreference(prefId)),
    [dispatch]
  )

  useEffect(() => {
    if (auth && isSet) {
      setHasLoaded(true)
      dispatch(fetchCustomerCommunicationPreferences())
    }
  }, [auth, navigate, dispatch, isSet])

  useEffect(() => {
    if (!is_notification_set) {
      dispatch(setCustomerCommunicationDefaultPreferences(defaultPrefs)).then(
        () => {
          dispatch(fetchCustomer())
          setIsSet(true)
          setIsNew(true)
        }
      )
    }
  }, [dispatch, is_notification_set])

  if (!auth) return null

  return !hasLoaded && isLoading ? (
    <Loading text="Retrieving your communication preferences..." />
  ) : errMsg ? (
    <Message color="error">{errMsg}</Message>
  ) : (
    <>
      {isNew && (
        <CommunicationPrefsDefaults>
          <Message color="alert" as="p" size="small">
            Communication preferences have been set to the defaults. Please
            adjust below as you would like.
          </Message>
        </CommunicationPrefsDefaults>
      )}
      <FormWrapper style={style}>
        <CommunicationPreferences
          areaTypes={areaTypes}
          channelTypes={channelTypes}
          prefs={prefs}
          add={add}
          remove={remove}
          accepts_marketing={accepts_marketing}
          order_notifications={order_notifications}
        />
      </FormWrapper>
    </>
  )
}

CommunicationPrefs.displayName = 'CommunicationPrefs'
CommunicationPrefs.propTypes = {
  style: propTypes.object,
}

export default CommunicationPrefs
