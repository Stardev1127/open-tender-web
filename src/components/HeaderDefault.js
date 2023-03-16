import React from 'react'
import propTypes from 'prop-types'

import { Header } from '.'
import { Back, Cart, NavMenu } from './buttons'

const HeaderDefault = ({ maxWidth = '100%', path }) => {
  return (
    <Header
      maxWidth={maxWidth}
      left={<Back path={path} />}
      right={
        <>
          <Cart />
          <NavMenu />
        </>
      }
    />
  )
}

HeaderDefault.displayName = 'HeaderDefault'
HeaderDefault.propTypes = {
  maxWidth: propTypes.string,
  path: propTypes.string,
}

export default HeaderDefault
