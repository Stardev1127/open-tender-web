import React from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import styled from '@emotion/styled'

import { selectTheme } from '../slices'

const BackgroundLoadingView = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${(props) => props.zIndex || 1};
  background-color: ${(props) => props.theme.bgColors.tertiary};
`

const BackgroundLoading = ({ zIndex = null }) => {
  const theme = useSelector(selectTheme)
  const loaderColor = theme.bgColors.primary

  return (
    <BackgroundLoadingView zIndex={zIndex}>
      <ClipLoader size={30} loading={true} color={`${loaderColor}`} />
    </BackgroundLoadingView>
  )
}

BackgroundLoading.displayName = 'BackgroundLoading'
BackgroundLoading.propTypes = {
  zIndex: propTypes.number,
}

export default BackgroundLoading
