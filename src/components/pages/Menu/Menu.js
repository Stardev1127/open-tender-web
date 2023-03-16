import { useEffect, createContext, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAnnouncementPage,
  fetchAllergens,
  fetchCustomerFavorites,
  fetchCustomerLoyalty,
  fetchCustomerOrders,
  fetchDeals,
  fetchLocation,
  fetchMenu,
  selectAnnouncementsPage,
  selectCustomer,
  selectCustomerPointsProgram,
  selectDeals,
  selectGroupOrder,
  selectGroupOrderClosed,
  selectMenu,
  selectMenuVars,
  selectOrder,
  selectSelectedAllergenNames,
} from '@open-tender/redux'
import { makeValidDeals } from '@open-tender/js'
import {
  openModal,
  selectBrand,
  selectContentSection,
  selectDisplaySettings,
  selectIsGroupOrder,
  setIsGroupOrder,
} from '../../../slices'
import SidebarModal from '../../SidebarModal'
import { ItemSidebar } from '../../sidebarModals'

export const MenuContext = createContext(null)

const MenuPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [init, setInit] = useState(true)
  const [hasTop, setHasTop] = useState(false)
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const menuContent = useSelector(selectContentSection('menu'))
  const order = useSelector(selectOrder)
  const { orderType, revenueCenter } = order
  const pointsProgram = useSelector(selectCustomerPointsProgram(orderType))
  const { revenueCenterId, serviceType, requestedAt } =
    useSelector(selectMenuVars)
  let { revenueCenters, categories, soldOut, error, loading } =
    useSelector(selectMenu)
  const isLoading = loading === 'pending'
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const groupOrderClosed = useSelector(selectGroupOrderClosed)
  const { cartGuest } = useSelector(selectGroupOrder)
  const { profile } = useSelector(selectCustomer)
  const { customer_id = null } = profile || {}
  const [customerId, setCustomerId] = useState(null)
  const { entities } = useSelector(selectDeals)
  const deals = has_deals && entities.length ? entities : null
  const validDeals = useMemo(
    () => makeValidDeals(deals, orderType, serviceType, revenueCenterId),
    [deals, orderType, serviceType, revenueCenterId]
  )
  const announcements = useSelector(selectAnnouncementsPage('HOME'))
  const displaySettings = useSelector(selectDisplaySettings)
  const isGroupOrder = useSelector(selectIsGroupOrder)

  useEffect(() => {
    if (!revenueCenterId) {
      return navigate('/locations')
    } else if (groupOrderClosed) {
      return navigate('/review')
    } else if (init) {
      setInit(false)
      dispatch(fetchAllergens())
      dispatch(fetchLocation(revenueCenterId))
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(fetchAnnouncementPage('MENU'))
    }
  }, [
    init,
    revenueCenterId,
    orderType,
    serviceType,
    requestedAt,
    groupOrderClosed,
    dispatch,
    navigate,
  ])

  useEffect(() => {
    if (has_deals && !isLoading && !cartGuest) {
      dispatch(fetchDeals())
    }
  }, [has_deals, customer_id, isLoading, dispatch, cartGuest])

  useEffect(() => {
    if (customer_id) {
      if (customer_id !== customerId) {
        setCustomerId(customer_id)
        dispatch(fetchCustomerLoyalty())
        dispatch(fetchCustomerFavorites())
        dispatch(fetchCustomerOrders(20))
      }
    } else {
      setCustomerId(null)
    }
  }, [customer_id, customerId, dispatch])

  useEffect(() => {
    if (isGroupOrder) {
      const reviewOrders = () => navigate(`/review`)
      dispatch(openModal({ type: 'groupOrder', args: { reviewOrders } }))
      dispatch(setIsGroupOrder(false))
    }
  }, [isGroupOrder, dispatch, navigate])

  return (
    <>
      <MenuContext.Provider
        value={{
          siteTitle,
          menuContent,
          revenueCenter,
          categories,
          revenueCenters,
          soldOut,
          allergenAlerts,
          isLoading,
          error,
          deals: validDeals,
          pointsProgram,
          announcements,
          displaySettings,
          hasTop,
          setHasTop,
        }}
      >
        <Outlet />
      </MenuContext.Provider>
      <SidebarModal>
        <ItemSidebar />
      </SidebarModal>
    </>
  )
}

MenuPage.displayName = 'MenuPage'
export default MenuPage
