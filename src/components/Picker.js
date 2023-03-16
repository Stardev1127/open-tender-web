import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const getActiveElement = (elements, topOffset) => {
  const filtered = elements.filter(
    (i) => i.getBoundingClientRect().top <= topOffset
  )
  const active = filtered.reduce(
    (max, i) =>
      max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
        ? max
        : i,
    null
  )
  return active
}

const PickerView = styled('div')`
  label: PickerView;

  height: ${(props) => (props.height * 3).toFixed(1)}rem;
  padding: 0;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  ::-webkit-scrollbar {
    display: none;
  }
`

const PickerSpacer = styled('div')`
  label: PickerSpacer;

  width: 100%;
  height: ${(props) => props.height.toFixed(1)}rem;
`

const PickerDateView = styled('div')`
  label: PickerDateView;

  width: 100%;
  height: ${(props) => props.height.toFixed(1)}rem;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) =>
      props.theme.colors[props.isActive ? 'primary' : 'tertiary']};
  }
`

const PickerDate = ({ index, label, height, isActive }) => {
  return (
    <PickerDateView
      name="interval"
      id={`time-${index}`}
      height={height}
      isActive={isActive}
    >
      <div>{label}</div>
    </PickerDateView>
  )
}

const Picker = ({ intervals, setValue, height = 44 }) => {
  const scrollRef = useRef(null)
  const [active, setActive] = useState(0)
  const [offset, setOffset] = useState(0)
  const parent = scrollRef.current
  const heightInRem = 44 / 10

  useEffect(() => {
    let timer = null
    const handleScroll = () => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(function () {
        const elements = Array.from(document.getElementsByName('interval'))
        const topOffset = parent.getBoundingClientRect().top + height * 1.5
        const activeElement = getActiveElement(elements, topOffset)
        const activeIndex = activeElement
          ? parseInt(activeElement.id.split('-')[1])
          : 0
        setActive(activeIndex)
      }, 150)
    }
    if (parent) {
      parent.addEventListener('scroll', handleScroll)
      return () => {
        parent.removeEventListener('scroll', () => handleScroll)
      }
    }
  }, [parent, height])

  useEffect(() => {
    const selected = intervals.find((i, idx) => idx === active)
    if (selected) {
      setValue(selected.value)
      if (parent) setOffset(height * active)
    }
  }, [active, intervals, parent, setValue, height])

  useEffect(() => {
    if (parent) parent.scrollTop = offset
  }, [parent, offset])

  return (
    <PickerView ref={scrollRef} height={heightInRem}>
      <PickerSpacer height={heightInRem} />
      {intervals.map((interval, index) => (
        <PickerDate
          key={interval.label}
          label={interval.label}
          height={heightInRem}
          index={index}
          isActive={index === active}
        />
      ))}
      <PickerSpacer height={heightInRem} />
    </PickerView>
  )
}

Picker.displayName = 'Picker'
Picker.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
}

export default Picker
