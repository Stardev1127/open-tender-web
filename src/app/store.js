import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import throttle from 'lodash/throttle'
import { loadState, saveState } from './localStorage'
import { analytics } from './analytics'
import configReducer from '../slices/configSlice'
import geolocationReducer from '../slices/geolocationSlice'
import modalReducer from '../slices/modalSlice'
import sidebarReducer from '../slices/sidebarSlice'
import sidebarModalReducer from '../slices/sidebarModalSlice'
import navReducer from '../slices/navSlice'
import navSiteReducer from '../slices/navSiteSlice'
import miscReducer from '../slices/miscSlice'
import postsReducer from '../slices/postsSlice'
import { openTenderReducer } from '@open-tender/redux'

const rootReducer = combineReducers({
  config: configReducer,
  geolocation: geolocationReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
  sidebarModal: sidebarModalReducer,
  nav: navReducer,
  navSite: navSiteReducer,
  misc: miscReducer,
  posts: postsReducer,
  data: openTenderReducer,
})

const persistedState = loadState()

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
})

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: customizedMiddleware.concat(analytics),
})

store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 3000)
)

export default store
