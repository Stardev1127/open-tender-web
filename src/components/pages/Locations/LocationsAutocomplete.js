import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  setAddress,
  selectOrder,
  setOrderServiceType,
} from '@open-tender/redux'
import { ButtonStyled, GoogleMapsAutocomplete } from '@open-tender/components'
import { Navigation } from '../../icons'

const LocationsAutocompleteView = styled('div')`
  position: absolute;
  z-index: 3;
  bottom: ${(props) => props.theme.layout.margin};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  // background-color: ${(props) => props.theme.bgColors.primary};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    bottom: ${(props) => props.theme.layout.marginMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const LocationsAutocompleteForm = styled.div`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: 2rem;
  // border-radius: 1rem;
  // background-color: ${(props) => props.theme.overlay.dark};

  label {
    display: block
    flex: 1 1 auto;
    color: ${(props) => props.theme.colors.light};
  }

  input {
    color: ${(props) => props.theme.colors.light};
    background-color: transparent;
    border-color: ${(props) => props.theme.colors.light};

    &:active,
    &:focus {
      background-color: transparent;
      border-color: ${(props) => props.theme.colors.light};
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.light};
    }
  }
`

const LocationsAutocompleteButtons = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LocationsAutocompleteToggle = styled.div`
  flex: 0 0 auto;
  margin: 0 2rem;

  button {
    &:first-of-type {
      border-radius: 0;
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
      border-right: 0;
    }

    &:last-of-type {
      border-radius: 0;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }
`

const LocationsAutocompleteButton = styled.button`
  padding: 0.7rem 1.4rem 0.7rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.light};
  color: ${(props) =>
    props.isActive ? props.theme.colors.dark : props.theme.colors.light};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.light : 'transparent'};
`

const LocationsAutocomplete = ({
  setCenter,
  maps,
  map,
  sessionToken,
  autocomplete,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { address, serviceType } = useSelector(selectOrder)
  const [locSt, setLocSt] = useState(serviceType || 'PICKUP')
  const formattedAddress = address ? address.formatted_address : ''
  const placeholder =
    serviceType === 'DELIVERY'
      ? 'enter a delivery address'
      : 'enter an address or zip code'

  const toggle = (evt, st) => {
    evt.preventDefault()
    setLocSt(st)
  }

  const order = () => {
    dispatch(setOrderServiceType('OLO', locSt))
    navigate('/locations')
  }

  useEffect(() => {
    if (!serviceType || serviceType === 'WALKIN') {
      setLocSt('PICKUP')
      dispatch(setOrderServiceType('OLO', 'PICKUP'))
    }
  }, [dispatch, serviceType])

  return (
    <LocationsAutocompleteView>
      <LocationsAutocompleteForm>
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
        <LocationsAutocompleteButtons>
          <LocationsAutocompleteToggle>
            <LocationsAutocompleteButton
              onClick={(evt) => toggle(evt, 'PICKUP')}
              isActive={locSt === 'PICKUP'}
            >
              Pickup
            </LocationsAutocompleteButton>
            <LocationsAutocompleteButton
              onClick={(evt) => toggle(evt, 'DELIVERY')}
              isActive={locSt === 'DELIVERY'}
            >
              Delivery
            </LocationsAutocompleteButton>
          </LocationsAutocompleteToggle>
          <ButtonStyled
            onClick={order}
            size="small"
            color="primary"
            disabled={!address || !locSt}
          >
            Go
          </ButtonStyled>
        </LocationsAutocompleteButtons>
      </LocationsAutocompleteForm>
    </LocationsAutocompleteView>
  )
}

LocationsAutocomplete.displayName = 'LocationsAutocomplete'
LocationsAutocomplete.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default LocationsAutocomplete
