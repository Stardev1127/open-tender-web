import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: null,
  type: null,
  args: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      document.body.classList.add('has-modal')
      const { type, args = null } = action.payload
      state.type = type
      state.args = args
    },
    closeModal: (state) => {
      document.body.classList.remove('has-modal')
      state.type = null
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export const selectModal = (state) => state.modal

export default modalSlice.reducer
