import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { inZone, isEmpty } from '@open-tender/js'
import { selectOrder, setAddress } from '@open-tender/redux'
import {
  ButtonStyled,
  FormError,
  GoogleMap,
  GoogleMapsAutocomplete,
} from '@open-tender/components'
import { ClipLoader } from 'react-spinners'
import { closeModal, selectSettings } from '../../slices'
import { Navigation } from '../icons'
import { ModalContent, ModalView } from '..'

const MapView = styled('div')`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const Map = ({ mapRef }) => (
  <MapView>
    <div ref={mapRef} />
  </MapView>
)

const MapsAutocompleteView = styled('div')`
  position: relative;
  width: 100%;
  margin: 0 0 24rem;
`

const MapsAutocompleteError = styled('div')`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 2rem 0 0;
`

const MapsAutocompleteInputView = styled('div')`
  width: 100%;
`

const MapsAutocompleteInput = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setCenter,
  setAddress,
}) => (
  <MapsAutocompleteInputView>
    <GoogleMapsAutocomplete
      maps={maps}
      map={map}
      sessionToken={sessionToken}
      autocomplete={autocomplete}
      formattedAddress={formattedAddress}
      setCenter={setCenter}
      setAddress={setAddress}
      icon={<Navigation strokeWidth={2} />}
      placeholder="please enter your address"
    />
  </MapsAutocompleteInputView>
)

MapsAutocompleteInput.displayName = 'MapsAutocompleteInput'
MapsAutocompleteInput.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
  formattedAddress: propTypes.string,
  setCenter: propTypes.func,
  setAddress: propTypes.func,
}

const nonInZone =
  'Address not in delivery zone. Please try again or try a different location.'

const MapsAutocomplete = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles } = googleMaps
  const [, setCenter] = useState(defaultCenter)
  const [hasAddress, setHasAdddres] = useState(false)
  const [error, setError] = useState(null)
  const { address, revenueCenter } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const { delivery_zone, slug } = revenueCenter || {}
  const { coordinates } = delivery_zone || {}
  const isInZone =
    !isEmpty(address) && coordinates ? inZone(address, coordinates) : false
  const menuSlug = `/menu/${slug}`

  const applyAddress = (address) => {
    dispatch(setAddress(address))
    setHasAdddres(true)
  }

  useEffect(() => {
    if (hasAddress) {
      if (isInZone) {
        dispatch(closeModal())
        navigate(menuSlug)
      } else {
        setError(nonInZone)
      }
    }
  }, [hasAddress, isInZone, dispatch, navigate, menuSlug])

  return (
    <ModalView>
      <ModalContent
        title="Enter your address"
        footer={
          <ButtonStyled onClick={() => dispatch(closeModal())}>
            Close
          </ButtonStyled>
        }
      >
        <MapsAutocompleteView>
          <GoogleMap
            apiKey={apiKey}
            zoom={zoom}
            styles={styles}
            center={defaultCenter}
            loader={<ClipLoader size={30} loading={true} />}
            renderMap={(props) => <Map {...props} />}
          >
            <MapsAutocompleteInput
              formattedAddress={formattedAddress}
              setCenter={setCenter}
              setAddress={(address) => applyAddress(address)}
            />
          </GoogleMap>
          <MapsAutocompleteError>
            <FormError errMsg={error} />
          </MapsAutocompleteError>
        </MapsAutocompleteView>
      </ModalContent>
    </ModalView>
  )
}

MapsAutocomplete.displayName = 'MapsAutocomplete'
MapsAutocomplete.propTypes = {}

export default MapsAutocomplete
