import styled from '@emotion/styled'
import { ClipLoader } from 'react-spinners'

const LocationsMapView = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.dark};
`

const LocationsMapLoading = styled('div')`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LocationsMap = ({ loading, mapRef }) => {
  return (
    <LocationsMapView>
      {loading && (
        <LocationsMapLoading>
          <ClipLoader size={30} loading={true} />
        </LocationsMapLoading>
      )}
      <div ref={mapRef} style={{ height: '100%' }} />
    </LocationsMapView>
  )
}

export default LocationsMap
