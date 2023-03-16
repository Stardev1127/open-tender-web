import propTypes from 'prop-types'

const ArrowRightLong = ({ size = 36, strokeWidth = 2, ...rest }) => {
  return (
    <svg
      width={size}
      viewBox="0 0 36 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M1 8L35 8" />
      <path d="M28 1L35 8L28 15" />
    </svg>
  )
}

ArrowRightLong.displayName = 'ArrowRightLong'
ArrowRightLong.propTypes = {
  size: propTypes.number,
  strokeWidth: propTypes.number,
}

export default ArrowRightLong
