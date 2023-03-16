import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { ButtonStyled, Heading, Text } from '@open-tender/components'

import { closeModal } from '../../slices'
import { QRCode as QRCodeImage } from '..'
import { ModalContent, ModalView } from '..'

const QRCodeView = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0;
  text-align: center;
`

const QRCodeHeader = styled('div')`
  & > p {
    margin: 0;
  }

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: 1.2;
    margin: 0;
  }

  p + p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: 1.2;
    margin: 1rem 0 0;
  }
`

const QRCodeContent = styled('div')`
  margin: 1.5rem 0;

  & > div {
    width: 16rem;
    margin: 2rem auto;
  }

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const QRCode = ({ src, alt, title, description, alert, footnote }) => {
  const dispatch = useDispatch()

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent>
        <QRCodeView>
          <QRCodeHeader>
            <Heading as="p">{title}</Heading>
            {description && <p>{description}</p>}
            {alert && (
              <Text color="alert" size="small" as="p">
                {alert}
              </Text>
            )}
          </QRCodeHeader>
          <QRCodeContent>
            <p>Scan to redeem in-store</p>
            <div>
              <QRCodeImage src={src} title={alt} />
            </div>
            {footnote && <p>{footnote}</p>}
          </QRCodeContent>
          <div>
            <ButtonStyled
              color="secondary"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </ButtonStyled>
          </div>
        </QRCodeView>
      </ModalContent>
    </ModalView>
  )
}

QRCode.displayName = 'QRCode'
QRCode.propTypes = {
  src: propTypes.string,
  alt: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
  alert: propTypes.string,
  footnote: propTypes.string,
}

export default QRCode
