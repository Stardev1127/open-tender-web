import React from 'react'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import { ClipLoader } from 'react-spinners'

const ImageSpinner = ({ size = 30, color, loading = true }) => {
  const theme = useTheme()
  return (
    <ClipLoader
      color={color || theme.colors.primary}
      size={size}
      loading={loading}
    />
  )
}

ImageSpinner.displayName = 'ImageSpinner'
ImageSpinner.propTypes = {
  size: propTypes.number,
  color: propTypes.string,
  loading: propTypes.bool,
}
export default ImageSpinner
