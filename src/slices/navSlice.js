import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleNav: (state) => {
      state.isOpen = !state.isOpen
      state.isOpen
        ? document.body.classList.add('has-modal')
        : document.body.classList.remove('has-modal')
    },
  },
})

export const { toggleNav } = navSlice.actions

export const selectNav = (state) => state.nav

export default navSlice.reducer
