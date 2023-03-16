import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react'
import { selectContentSection } from '../slices'
import { Header, HeaderLogo } from '.'
import { Cart, NavMenu, User } from './buttons'

const HeaderGuest = ({ maxWidth = '76.8rem' }) => {
  const theme = useTheme()
  const { displayLogoMobile } = useSelector(selectContentSection('guest'))
  const showLogo = isMobile ? displayLogoMobile : false

  return (
    <Header
      style={{ boxShadow: 'none' }}
      maxWidth={maxWidth}
      borderColor={!isMobile ? theme.border.color : undefined}
      title={showLogo ? <HeaderLogo /> : null}
      left={isMobile ? <User /> : <HeaderLogo />}
      right={
        <>
          {!isMobile && <User />}
          <Cart />
          <NavMenu />
        </>
      }
    />
  )
}

HeaderGuest.displayName = 'HeaderGuest'
HeaderGuest.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderGuest
