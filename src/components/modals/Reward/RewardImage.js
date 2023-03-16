import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useImage, BgImage } from '@open-tender/components'

import { ImageSpinner } from '../..'

const RewardImageContainer = styled('div')`
  width: 100%;
  margin: 0 auto 1.5rem;
`

const RewardImageView = styled('div')`
  position: relative;
  width: 100%;
  padding: 33.3333%;
  line-height: 0.1;
`

const RewardLoading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  > div p {
    display: inline-block;
    max-width: 24rem;
    line-height: 1.5;
  }
`

const RewardBackgroundImage = styled(BgImage)`
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  animation: fade-in 0.25s ease-in-out 0s forwards;
`

const RewardImage = ({ src, alt }) => {
  const { hasLoaded, hasError } = useImage(src)
  const isLoading = !hasLoaded && !hasError
  const bgStyle = src ? { backgroundImage: `url(${src}` } : null

  return (
    <RewardImageContainer>
      <RewardImageView>
        {isLoading ? (
          <RewardLoading>
            <ImageSpinner size={24} />
          </RewardLoading>
        ) : hasLoaded ? (
          <RewardBackgroundImage style={bgStyle}>&nbsp;</RewardBackgroundImage>
        ) : hasError ? (
          <RewardLoading>
            <div>
              <p>Image failed to load. Sorry about that.</p>
            </div>
          </RewardLoading>
        ) : null}
      </RewardImageView>
    </RewardImageContainer>
  )
}

RewardImage.displayName = 'RewardImage'
RewardImage.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
}

export default RewardImage
