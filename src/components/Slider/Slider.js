import { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isBrowser } from 'react-device-detect'
import { useSwipeable } from 'react-swipeable'

import { BackgroundContent, BackgroundImage } from '..'
import SliderArrows from './SliderArrows'
import SliderArrow from './SliderArrow'
import SliderDots from './SliderDots'
import SliderDot from './SliderDot'
import { useTheme } from '@emotion/react'

const SliderView = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
`

const SliderSwipeWrapper = styled.div`
  display: flex;
  height: 100%;
`

const Slide = styled.div`
  position: absolute;
  z-index: ${(props) => props.index};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  transition: transform ${(props) => props.transition}ms ease;
  opacity: ${(props) => (props.active ? '1' : '0')};
  transform: translate3D(${(props) => props.shift.toFixed(2)}%, 0, 0);
`

const defaultSettings = {
  title: null,
  subtitle: null,
  transition_type: 'SLIDE',
  autoplay: false,
  transition: 1000,
  transition_mobile: 500,
  duration: 3000,
  duration_mobile: 2500,
  show_arrows: true,
  show_arrows_mobile: false,
  arrows_vertical: 'TOP',
  arrows_horizontal: 'RIGHT',
  show_dots: true,
  show_dots_mobile: true,
}

const Slider = ({ settings = {}, slides, bgColor }) => {
  const { layout } = useTheme()
  const { headerHeightSite, headerHeightSiteMobile, padding, paddingMobile } =
    layout
  const timer = useRef(null)
  const slider = useRef(null)
  const [pause, setPause] = useState(false)
  const [index, setIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(0)
  const {
    // transition_type,
    autoplay,
    transition,
    transition_mobile,
    duration,
    duration_mobile,
    show_arrows,
    show_arrows_mobile,
    arrows_vertical,
    arrows_horizontal,
    show_dots,
    show_dots_mobile,
  } = settings || defaultSettings
  const transitionSpeed = isBrowser ? transition : transition_mobile
  const interval = isBrowser ? duration : duration_mobile
  const showArrows = isBrowser ? show_arrows : show_arrows_mobile
  const showDots = isBrowser ? show_dots : show_dots_mobile
  const size = isBrowser ? 3.6 : 2.4
  const count = slides.length
  const last = count - 1
  const prevIndex = index === 0 ? last : index - 1
  const nextIndex = index === last ? 0 : index + 1
  const moveLeft =
    (index > lastIndex && !(index === last && lastIndex === 0)) ||
    (index === 0 && lastIndex === last)
  const moveRight = !moveLeft
  const paddingVertical = showDots
    ? isBrowser
      ? headerHeightSite
      : headerHeightSiteMobile
    : isBrowser
    ? padding
    : paddingMobile

  const config = {
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  }

  useEffect(() => {
    if (autoplay) {
      timer.current = setInterval(() => {
        const idx = index === count - 1 ? 0 : index + 1
        if (!pause) {
          setLastIndex(index)
          setIndex(idx)
        }
      }, interval)
      return () => {
        clearInterval(timer.current)
      }
    }
  }, [index, count, interval, pause, autoplay])

  useEffect(() => {
    if (autoplay && slider.current) {
      slider.current.addEventListener('mouseover', () => {
        setPause(true)
      })
      slider.current.addEventListener('mouseout', () => {
        setPause(false)
      })
    }
  }, [slider, autoplay])

  const showSlide = (evt, idx) => {
    if (evt) {
      evt.preventDefault()
      evt.target.blur()
    }
    if (idx >= 0 && idx <= count - 1) {
      setLastIndex(index)
      setIndex(idx)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => showSlide(null, index === last ? 0 : index + 1),
    onSwipedRight: () => showSlide(null, index === 0 ? last : index - 1),
    ...config,
  })

  return (
    <SliderView ref={slider}>
      <SliderSwipeWrapper {...handlers}>
        {slides.map((slide, idx) => {
          const shift = idx === index ? 0 : idx === prevIndex ? -100 : 100
          const active =
            idx === index ||
            (moveLeft && idx === prevIndex) ||
            (moveRight && idx === nextIndex)
          return (
            <Slide
              key={slide.imageUrl}
              transition={transitionSpeed}
              index={idx}
              shift={shift}
              active={active}
            >
              <BackgroundImage {...slide} bgColor={bgColor}>
                <BackgroundContent
                  {...slide}
                  paddingVertical={paddingVertical}
                />
              </BackgroundImage>
            </Slide>
          )
        })}
      </SliderSwipeWrapper>
      {showArrows && (
        <SliderArrows vertical={arrows_vertical} horizontal={arrows_horizontal}>
          <SliderArrow
            direction="LEFT"
            size={size}
            onClick={(evt) => showSlide(evt, index === 0 ? last : index - 1)}
          />
          <SliderArrow
            direction="RIGHT"
            size={size}
            onClick={(evt) => showSlide(evt, index === last ? 0 : index + 1)}
          />
        </SliderArrows>
      )}
      {showDots && (
        <SliderDots>
          {slides.map((slide, idx) => (
            <SliderDot
              key={slide.announcement_id}
              onClick={(evt) => showSlide(evt, idx)}
              active={index === idx}
            />
          ))}
        </SliderDots>
      )}
    </SliderView>
  )
}

Slider.displayName = 'Slider'
Slider.propTypes = {
  settings: propTypes.object,
  slides: propTypes.array,
  bgColor: propTypes.string,
}

export default Slider
