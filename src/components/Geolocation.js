import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { useGeolocation } from '@open-tender/components'
import { setGeoLatLng, setGeoError, setGeoLoading } from '../slices'

const Geolocation = () => {
  const dispatch = useDispatch()
  const { geoLatLng, geoError } = useGeolocation()

  useEffect(() => {
    dispatch(setGeoLoading())
  }, [dispatch])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  return <Outlet />
}

Geolocation.displayName = 'Geolocation'
Geolocation.propTypes = {}

export default Geolocation
