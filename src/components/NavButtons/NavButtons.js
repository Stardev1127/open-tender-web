import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import NavButton from './NavButton'

const NavButtonsView = styled.div`
  margin: 0 auto;
`

const NavButtons = ({ buttons, delay = 0.125 }) => {
  return (
    <NavButtonsView>
      {buttons.map((button, index) => (
        <NavButton
          key={button.title}
          delay={`${((index + 1) * 0.125 + delay).toFixed(3)}s`}
          {...button}
        />
      ))}
    </NavButtonsView>
  )
}

NavButtons.displayName = 'NavButtons'
NavButton.propTypes = {
  buttons: propTypes.array,
}

export default NavButtons
