import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  topOffset: null,
  menuBrowse: false,
  menuSection: null,
  menuPath: null,
  isGroupOrder: false,
}

const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTopOffset: (state, action) => {
      state.topOffset = action.payload
    },
    setMenuSection: (state, action) => {
      state.menuSection = action.payload
    },
    setMenuPath: (state, action) => {
      state.menuPath = action.payload
    },
    setMenuBrowse: (state, action) => {
      state.menuBrowse = action.payload
    },
    setIsGroupOrder: (state, action) => {
      state.isGroupOrder = action.payload
    },
  },
})

export const {
  setTopOffset,
  setMenuBrowse,
  setMenuSection,
  setMenuPath,
  setIsGroupOrder,
} = miscSlice.actions

export const selectTopOffset = (state) => state.misc.topOffset
export const selectMenuBrowse = (state) => state.misc.menuBrowse
export const selectMenuSection = (state) => state.misc.menuSection
export const selectMenuPath = (state) => state.misc.menuPath
export const selectIsGroupOrder = (state) => state.misc.isGroupOrder

export default miscSlice.reducer
