import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'

const Hamburger = ({ size, strokeWidth, ...rest }) => {
  const { icons } = useTheme()
  return (
    <svg
      width={size}
      viewBox="0 0 20 11"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || icons.strokeWidth}
      strokeLinecap="square"
      overflow="visible"
      {...rest}
    >
      <line x1="0.5" y1="0.5" x2="19.5" y2="0.5" />
      <line x1="0.5" y1="5.5" x2="19.5" y2="5.5" />
      <line x1="0.5" y1="10.5" x2="19.5" y2="10.5" />
    </svg>
  )
}

Hamburger.displayName = 'Hamburger'
Hamburger.propTypes = {
  size: propTypes.number,
  strokeWidth: propTypes.number,
}

export default Hamburger
