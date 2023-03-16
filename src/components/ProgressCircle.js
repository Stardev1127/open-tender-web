import React, { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading, Preface } from '@open-tender/components'
import { isBrowser } from 'react-device-detect'

// https://kimmobrunfeldt.github.io/progressbar.js/
// https://github.com/kimmobrunfeldt/progressbar.js/tree/master/src
// https://dev.to/vaibhavkhulbe/let-s-make-and-wear-those-css-3-progress-rings-2ngf
// https://developer.mozilla.org/en-US/docs/Web/API/Element/animate

const ProgressCirlceView = styled('div')`
  position: relative;
  width: 12rem;
  height: 12rem;
  margin: 0 auto;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 10rem;
    height: 10rem;
  }

  path:last-of-type {
    stroke: ${(props) => props.theme.colors.primary};
  }

  path:first-of-type {
    stroke: ${(props) => props.theme.bgColors.tertiary};
  }
`

const ProgressPercentage = styled('div')`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  > div {
    margin: -0.5rem 0 0;

    span {
      display: block;
      line-height: 1;
    }

    span:first-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        font-size: ${(props) => props.theme.fonts.sizes.h4};
      }
    }

    span + span {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const ProgressCirlce = ({ strokeWidth = 12, progress, isLoading }) => {
  const progressRef = useRef()
  const offsetRef = useRef()
  const [length, setLength] = useState(null)
  const [offset, setOffset] = useState(null)
  const [backupStyle, setBackupStyle] = useState(null)
  const radius = 50 - strokeWidth / 2
  const dimensions = `M 50,50 m 0,-${radius} a ${radius},${radius} 0 1 1 0,${
    radius * 2
  } a ${radius},${radius} 0 1 1 0,-${radius * 2}`
  const style = length
    ? {
        strokeDasharray: `${length.toFixed(3)} ${length.toFixed(3)}`,
        strokeDashoffset: length,
      }
    : null

  useEffect(() => {
    setLength(progressRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    const end = length - (length * progress) / 100
    setOffset(end)
  }, [length, progress])

  useEffect(() => {
    if (length && offset && !isLoading) {
      try {
        const duration = 2000 * (progress / 100)
        const strokeDasharray = `${length.toFixed(3)} ${length.toFixed(3)}`
        offsetRef.current.animate(
          [
            { strokeDasharray, strokeDashoffset: length },
            { strokeDasharray, strokeDashoffset: offset },
          ],
          {
            delay: 500,
            duration,
            fill: 'forwards',
          }
        )
      } catch (err) {
        setBackupStyle({
          strokeDasharray: `${length.toFixed(3)} ${length.toFixed(3)}`,
          strokeDashoffset: offset,
        })
      }
    }
  }, [length, offset, progress, isLoading])

  return (
    <ProgressCirlceView>
      <svg viewBox="0 0 100 100">
        <path
          ref={progressRef}
          d={dimensions}
          strokeWidth={`${strokeWidth}`}
          fillOpacity="0"
        ></path>
        <path
          ref={offsetRef}
          d={dimensions}
          strokeWidth={`${strokeWidth}`}
          fillOpacity="0"
          style={backupStyle || style}
        ></path>
      </svg>
      <ProgressPercentage>
        <div>
          <Heading>{progress}%</Heading>
          {isBrowser && <Preface size="xSmall">Complete</Preface>}
        </div>
      </ProgressPercentage>
    </ProgressCirlceView>
  )
}

ProgressCirlce.displayName = 'ProgressCirlce'
ProgressCirlce.propTypes = {
  progress: propTypes.number,
}

export default ProgressCirlce
