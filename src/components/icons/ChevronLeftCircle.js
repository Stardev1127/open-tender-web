import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'

const ChevronLeftCircle = ({ size, strokeWidth, ...rest }) => {
  const { icons } = useTheme()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 25"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || icons.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      {...rest}
    >
      <path d="M15 18L9 12L15 6" />
      <circle cx="12.5" cy="12.5" r="12" />
    </svg>
  )
}

ChevronLeftCircle.displayName = 'ChevronLeftCircle'
ChevronLeftCircle.propTypes = {
  size: propTypes.number,
  strokeWidth: propTypes.number,
}

export default ChevronLeftCircle
