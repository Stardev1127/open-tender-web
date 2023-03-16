import React from 'react'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { ButtonStyled, ButtonIcon } from '@open-tender/components'

const ButtonBoth = ({
  text,
  label,
  icon,
  onClick,
  color = 'header',
  size = 'header',
  useButton = false,
  style = null,
}) => {
  return isBrowser || useButton ? (
    <ButtonStyled
      onClick={onClick}
      label={label}
      icon={icon}
      color={color}
      size={size}
      style={style}
    >
      {text}
    </ButtonStyled>
  ) : (
    <ButtonIcon label={label || text} onClick={onClick}>
      {icon}
    </ButtonIcon>
  )
}

ButtonBoth.displayName = 'ButtonBoth'
ButtonBoth.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  onClick: propTypes.func,
  color: propTypes.string,
  size: propTypes.string,
  style: propTypes.object,
}

export default ButtonBoth
