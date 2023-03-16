import propTypes from 'prop-types'

const TriangleDown = ({ size = 12 }) => {
  return (
    <svg width={size} viewBox="0 0 12 9" fill="currentColor">
      <path d="M6 9L0.803847 -2.51245e-08L11.1962 8.834e-07L6 9Z" />
    </svg>
  )
}

TriangleDown.displayName = 'TriangleDown'
TriangleDown.propTypes = {
  size: propTypes.number,
}

export default TriangleDown
