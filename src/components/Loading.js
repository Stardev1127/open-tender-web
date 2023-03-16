import React from 'react'
import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { BarLoader, ClipLoader } from 'react-spinners'

const loader = (type, props) => {
  switch (type) {
    case 'Clip':
      return <ClipLoader {...props} loading={true} />
    default:
      return <BarLoader {...props} loading={true} />
  }
}

const LoadingView = styled('div')`
  text-align: center;
`

const LoadingLoader = styled('div')`
  display: inline-block;

  & > span {
    display: block;
  }
`

const LoadingMessage = styled('p')`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const Loading = ({ type, text, color, size = 100, style = null }) => {
  const theme = useTheme()
  const themeColor = theme.colors ? theme.colors.primary : null
  const props = { color: color || themeColor, size }
  return (
    <LoadingView style={style}>
      <LoadingLoader>{loader(type, props)}</LoadingLoader>
      {text && text.length > 0 && <LoadingMessage>{text}</LoadingMessage>}
    </LoadingView>
  )
}

Loading.displayName = 'Loading'
Loading.propTypes = {
  type: propTypes.string,
  size: propTypes.number,
  text: propTypes.string,
  style: propTypes.object,
}

export default Loading
