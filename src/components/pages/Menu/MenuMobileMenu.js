import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'
import { useSelector } from 'react-redux'
import { selectAutoSelect, selectGroupOrder } from '@open-tender/redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import {
  CancelEdit,
  GroupGuest,
  GroupOrder,
  LeaveGroup,
  RequestedAt,
  RevenueCenter,
  ServiceType,
} from '../../buttons'

const MenuMobileMenuView = styled.div`
  label: MenuMobileMenuView;
  position: fixed;
  z-index: 12;
  top: ${(props) => props.theme.layout.navHeight};
  left: 0;
  right: 0;
  padding: ${(props) => props.theme.layout.paddingMobile};
  transition: all 0.125s ease;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  transform: translateY(${(props) => (props.show ? '0' : '-100%')});
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const MenuMobileMenuOverlay = styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.overlay.dark};
`

const MenuMobileMenuContainer = styled.div`
  width: 100%;
  max-width: 48rem;
  // padding: ${(props) => props.theme.layout.paddingMobile};
  margin: 0 auto;
`

const MenuMobileMenuRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top-style: solid;
  border-top-width: ${(props) => props.theme.border.width};
  border-top-color: ${(props) => props.theme.border.color};

  &:first-of-type {
    border: 0;
    padding-top: 0;
  }

  &:last-of-type {
    padding-bottom: 0;
  }

  & > span {
    display: block;
  }
`

const MenuMobileMenu = ({ order, showMenu, setShowMenu }) => {
  const { orderId, revenueCenter, serviceType, requestedAt } = order
  const autoSelect = useSelector(selectAutoSelect)
  const { cartGuest, isCartOwner } = useSelector(selectGroupOrder)
  const settings = revenueCenter ? revenueCenter.settings || revenueCenter : {}
  const hasGroupOrdering = settings.group_ordering

  if (cartGuest) return null

  return (
    <>
      <MenuMobileMenuView show={showMenu}>
        <MenuMobileMenuContainer>
          {cartGuest ? (
            <>
              <MenuMobileMenuRow>
                <Preface size="xSmall">Submit your order</Preface>
                <GroupGuest />
              </MenuMobileMenuRow>
              <MenuMobileMenuRow>
                <Preface size="xSmall">Change your mind?</Preface>
                <LeaveGroup />
              </MenuMobileMenuRow>
            </>
          ) : (
            <>
              {orderId && (
                <MenuMobileMenuRow>
                  <Preface size="xSmall">Editing Order #{orderId}</Preface>
                  <CancelEdit />
                </MenuMobileMenuRow>
              )}
              {revenueCenter && !autoSelect ? (
                <MenuMobileMenuRow>
                  <Preface size="xSmall">Location</Preface>
                  <RevenueCenter useButton={true} />
                </MenuMobileMenuRow>
              ) : null}
              {serviceType && !isCartOwner ? (
                <MenuMobileMenuRow>
                  <Preface size="xSmall">Service Type</Preface>
                  <ServiceType useButton={true} />
                </MenuMobileMenuRow>
              ) : null}
              {requestedAt && (
                <MenuMobileMenuRow>
                  <Preface size="xSmall">Requested Time</Preface>
                  <RequestedAt useButton={true} />
                </MenuMobileMenuRow>
              )}
              {hasGroupOrdering && (
                <MenuMobileMenuRow>
                  <Preface size="xSmall">Group Ordering</Preface>
                  <GroupOrder />
                </MenuMobileMenuRow>
              )}
            </>
          )}
        </MenuMobileMenuContainer>
      </MenuMobileMenuView>
      <TransitionGroup component={null}>
        {showMenu ? (
          <CSSTransition
            key="mobile-menu-overlay"
            classNames="overlay"
            timeout={250}
          >
            <MenuMobileMenuOverlay onClick={() => setShowMenu(false)} />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </>
  )
}

export default MenuMobileMenu
