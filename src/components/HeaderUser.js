import propTypes from 'prop-types'
import { Header } from '.'
import { Back, Cart, NavMenu } from './buttons'

const HeaderUser = ({ maxWidth = '100%' }) => {
  return (
    <Header
      maxWidth={maxWidth}
      left={<Back path="/account/settings" />}
      right={
        <>
          <Cart />
          <NavMenu />
        </>
      }
    />
  )
}

HeaderUser.displayName = 'HeaderUser'
HeaderUser.propTypes = {
  maxWidth: propTypes.string,
}

export default HeaderUser
