import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  latLng: null,
  error: null,
  loading: false,
}

const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    resetGeolocation: () => initialState,
    setGeoLatLng: (state, action) => {
      state.latLng = action.payload
      state.error = null
      state.loading = false
    },
    setGeoError: (state, action) => {
      state.latLng = null
      state.error = action.payload
      state.loading = false
    },
    setGeoLoading: (state) => {
      state.loading = true
    },
  },
})

export const { resetGeolocation, setGeoLatLng, setGeoError, setGeoLoading } =
  geolocationSlice.actions

export const selectGeoLatLng = (state) => state.geolocation.latLng

export default geolocationSlice.reducer
