import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMap, GoogleMapsAutocomplete } from '@open-tender/components'
import { selectSettings } from '../../../slices'
import { Navigation } from '../../icons'

const CateringMapView = styled('div')`
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`

const CateringMap = ({ mapRef }) => (
  <CateringMapView>
    <div ref={mapRef} />
  </CateringMapView>
)

const CateringAutocompleteView = styled('div')`
  width: 100%;
`

const CateringAutocompleteInputView = styled('div')`
  width: 100%;
`

const CateringAutocompleteInput = ({
  maps,
  map,
  sessionToken,
  autocomplete,
  formattedAddress,
  setCenter,
  setAddress,
}) => (
  <CateringAutocompleteInputView>
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
  </CateringAutocompleteInputView>
)

CateringAutocompleteInput.displayName = 'CateringAutocompleteInput'
CateringAutocompleteInput.propTypes = {
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
  formattedAddress: propTypes.string,
  setCenter: propTypes.func,
  setAddress: propTypes.func,
}

const CateringAutocomplete = () => {
  const dispatch = useDispatch()
  const { address } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles } = googleMaps
  const [, setCenter] = useState(defaultCenter)
  // const serviceTypeDisabled = !address ? true : false

  return (
    <CateringAutocompleteView>
      <GoogleMap
        apiKey={apiKey}
        zoom={zoom}
        styles={styles}
        center={defaultCenter}
        loader={<ClipLoader size={30} loading={true} />}
        renderMap={(props) => <CateringMap {...props} />}
      >
        <CateringAutocompleteInput
          formattedAddress={formattedAddress}
          setCenter={setCenter}
          setAddress={(address) => dispatch(setAddress(address))}
        />
      </GoogleMap>
    </CateringAutocompleteView>
  )
}

CateringAutocomplete.displayName = 'CateringAutocomplete'
CateringAutocomplete.propTypes = {}

export default CateringAutocomplete
