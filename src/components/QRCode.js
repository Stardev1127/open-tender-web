import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useImage } from '@open-tender/components'
import { AlertCircle } from './icons'
import { ImageSpinner } from '.'

const QRCodeView = styled('div')`
  position: relative;
  width: 100%;
  padding: 50% 0;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.border.color};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: white;
  line-height: 0.1;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
`

const Loading = styled('div')`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > div p {
    display: inline-block;
    max-width: 24rem;
    line-height: 1.5;
  }
`

const QRCode = ({ src, alt = '', isSmall = false }) => {
  const { hasLoaded, hasError } = useImage(src)
  const isLoading = !hasLoaded && !hasError

  return (
    <QRCodeView>
      {isLoading ? (
        <Loading>
          <ImageSpinner size={24} />
        </Loading>
      ) : hasLoaded ? (
        <img src={src} alt={alt} />
      ) : hasError ? (
        <Loading>
          <div>
            {isSmall ? (
              <p>QR Code failed to load. Please close window and retry.</p>
            ) : (
              <AlertCircle />
            )}
          </div>
        </Loading>
      ) : null}
    </QRCodeView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
}

export default QRCode
