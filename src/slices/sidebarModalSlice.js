import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
}

const sidebarModalSlice = createSlice({
  name: 'sidebarModal',
  initialState,
  reducers: {
    toggleSidebarModal: (state) => {
      state.isOpen = !state.isOpen
      state.isOpen
        ? document.body.classList.add('has-modal')
        : document.body.classList.remove('has-modal')
    },
  },
})

export const { toggleSidebarModal } = sidebarModalSlice.actions

export const selectSidebarModal = (state) => state.sidebarModal

export default sidebarModalSlice.reducer
