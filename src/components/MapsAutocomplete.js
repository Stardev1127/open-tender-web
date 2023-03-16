import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { setAddress, selectOrder } from '@open-tender/redux'
import { GoogleMapsAutocomplete } from '@open-tender/components'
import { Navigation } from './icons'

const MapsAutocompleteView = styled('div')`
  position: fixed;
  z-index: 15;
  top: ${(props) => props.theme.layout.navHeight};
  right: 0;
  width: 76.8rem;
  height: ${(props) => props.theme.layout.navHeight};
  padding: 0 ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    top: ${(props) => props.theme.layout.navHeightMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const MapsAutocomplete = ({
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const { address, serviceType } = useSelector(selectOrder)
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  return (
    <MapsAutocompleteView>
      <GoogleMapsAutocomplete
        maps={maps}
        map={map}
        sessionToken={sessionToken}
        autocomplete={autocomplete}
        formattedAddress={formattedAddress}
        setAddress={(address) => dispatch(setAddress(address))}
        setCenter={setCenter}
        icon={<Navigation strokeWidth={2} />}
        placeholder={placeholder}
      />
    </MapsAutocompleteView>
  )
}

MapsAutocomplete.displayName = 'MapsAutocomplete'
MapsAutocomplete.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default MapsAutocomplete
