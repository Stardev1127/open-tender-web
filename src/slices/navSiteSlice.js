import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const navSiteSlice = createSlice({
  name: 'navSite',
  initialState,
  reducers: {
    toggleNavSite: (state) => {
      state.isOpen = !state.isOpen
      state.isOpen
        ? document.body.classList.add('has-modal')
        : document.body.classList.remove('has-modal')
    },
  },
})

export const { toggleNavSite } = navSiteSlice.actions

export const selectNavSite = (state) => state.navSite

export default navSiteSlice.reducer
