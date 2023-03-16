import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'

const UserCircle = ({ size, strokeWidth, isFilled = false }) => {
  const { bgColors, icons } = useTheme()
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      strokeWidth={strokeWidth || icons.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
    >
      <circle
        cx="14"
        cy="14"
        r="13.5"
        stroke="currentColor"
        fill={isFilled ? 'currentColor' : 'none'}
      />
      <path
        d="M20 20.75V19.25C20 18.4544 19.6839 17.6913 19.1213 17.1287C18.5587 16.5661 17.7956 16.25 17 16.25H11C10.2044 16.25 9.44129 16.5661 8.87868 17.1287C8.31607 17.6913 8 18.4544 8 19.25V20.75"
        stroke={isFilled ? bgColors.primary : 'currentColor'}
      />
      <path
        d="M14 13.25C15.6569 13.25 17 11.9069 17 10.25C17 8.59315 15.6569 7.25 14 7.25C12.3431 7.25 11 8.59315 11 10.25C11 11.9069 12.3431 13.25 14 13.25Z"
        stroke={isFilled ? bgColors.primary : 'currentColor'}
      />
    </svg>
  )
}

UserCircle.displayName = 'UserCircle'
UserCircle.propTypes = {
  size: propTypes.number,
  strokeWidth: propTypes.number,
  isFilled: propTypes.bool,
}

export default UserCircle
