import { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  dateStrMinutesToIso,
  isoToDateStrMinutes,
  makeDates,
  makeTimes,
  makeReadableDateStrFromIso,
  serviceTypeNamesMap,
} from '@open-tender/js'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  SelectOnly,
} from '@open-tender/components'

const RequestedAtDateTimeView = styled.div`
  label: RequestedAtDateTimeView;
  text-align: center;
`

const RequestedAtDateTimeTitle = styled.p`
  width: 100%;
  margin: 0 0 1rem;
  text-align: center;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const RequestedAtDateTimeAsap = styled.div`
  label: RequestedAtDateTimeAsap;

  margin: 0 0 3rem;
  text-align: center;

  button {
    min-width: 32rem;
    max-width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      min-width: 100%;
    }
  }
`

const RequestedAtDateTimeSelects = styled.div`
  label: RequestedAtDateTimeSelects;

  width: 100%;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }

  & > div + div {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 2rem 0 0;
    }
  }
`

const RequestedAtDateTimeSelect = styled.div`
  width: 47.5%;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    // max-width: 24rem;
  }

  select {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    // @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    //   font-size: ${(props) => props.theme.fonts.sizes.main};
    // }
  }
`

const RequestedAtDateTimeNevermind = styled.div`
  button {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RequestedAtDateTime = ({
  revenueCenter,
  serviceType,
  orderType,
  requestedAt,
  chooseTime,
  cancel,
  isLocation,
  isReorder,
  isLanding,
  isGroupOrder,
}) => {
  const {
    name,
    timezone: tz,
    first_times,
    holidays,
    days_ahead,
    valid_times,
    group_ordering,
  } = revenueCenter
  const { prep_time = 0, lead_time = 0 } = group_ordering || {}
  const leadTime = isGroupOrder ? prep_time + lead_time : 0
  const orderTypeName = orderType === 'CATERING' ? 'Catering ' : ''
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const firstTime = first_times[serviceType]
  const selected = requestedAt && requestedAt !== 'asap'
  const requested = selected ? isoToDateStrMinutes(requestedAt, tz) : {}
  const [date, setDate] = useState(requested.date || firstTime.date)
  const [time, setTime] = useState(requested.minutes || firstTime.minutes)
  const [dateChange, setDateChange] = useState(false)
  const daysAhead = orderType === 'CATERING' ? 100 : days_ahead
  const dates = useMemo(
    () => makeDates(firstTime.date, daysAhead, 'E, MMM d'),
    [firstTime.date, daysAhead]
  )
  const dateOptions = dates.map(({ label, value }) => ({ name: label, value }))
  const timeOptions = useMemo(
    () =>
      makeTimes(date, firstTime, valid_times, holidays, serviceType, leadTime),
    [date, firstTime, valid_times, holidays, serviceType, leadTime]
  )
  const orderDate = dateOptions.find((i) => i.value === date)
  const showAsap = firstTime.has_asap && date === firstTime.date ? true : false
  const firstIso = dateStrMinutesToIso(
    firstTime.date,
    firstTime.minutes + leadTime,
    tz
  )
  const asapTime =
    showAsap && firstTime ? makeReadableDateStrFromIso(firstIso, tz) : null
  const asapTimeOption = {
    name: `ASAP (about ${asapTime})`,
    value: 'asap',
    disabled: false,
  }
  const timeOptionsAsap = showAsap
    ? [asapTimeOption, ...timeOptions]
    : timeOptions
  const firstOrderableTime = timeOptionsAsap
    ? timeOptionsAsap.find((i) => !i.disabled)
    : null
  const firstMinutes = firstOrderableTime ? firstOrderableTime.value : null
  const defaultTime = timeOptionsAsap
    ? timeOptionsAsap.find((i) => i.value === firstMinutes)
    : null
  const orderTime = timeOptionsAsap
    ? timeOptionsAsap.find((i) => i.value === time) || defaultTime
    : null
  const isAsap = orderTime && orderTime.value === 'asap' ? true : false
  const orderMsg =
    orderDate && orderTime
      ? isAsap
        ? `Order ${orderTime.name}`
        : `Order for ${orderDate.name} @ ${orderTime.name}`
      : 'Choose Time'
  const timeVal = orderTime ? orderTime.value : time
  const requestedTime = isAsap ? 'asap' : dateStrMinutesToIso(date, timeVal, tz)
  const closedTimeOptions = [{ name: 'Closed', value: null, disabled: false }]

  const changeDate = (evt) => {
    setDate(evt.target.value)
    setDateChange(true)
  }

  const changeTime = (evt) => {
    setTime(parseInt(evt.target.value))
  }

  useEffect(() => {
    if (dateChange) {
      if (firstMinutes) setTime(firstMinutes)
      setDateChange(false)
    }
  }, [dateChange, firstMinutes])

  return (
    <RequestedAtDateTimeView>
      <RequestedAtDateTimeTitle>
        <Heading>
          {orderTypeName}
          {serviceTypeName}
          {orderTypeName ? <br /> : null} from {name}
        </Heading>
      </RequestedAtDateTimeTitle>
      <p>Please choose a date & time below.</p>
      <RequestedAtDateTimeSelects>
        <RequestedAtDateTimeSelect>
          <SelectOnly
            label="Order Date"
            name="order-date"
            value={date}
            onChange={changeDate}
            options={dateOptions}
          />
        </RequestedAtDateTimeSelect>
        <RequestedAtDateTimeSelect>
          <SelectOnly
            label="Order Time"
            name="order-time"
            value={time}
            onChange={changeTime}
            options={timeOptionsAsap || closedTimeOptions}
          />
        </RequestedAtDateTimeSelect>
      </RequestedAtDateTimeSelects>
      <RequestedAtDateTimeAsap>
        <ButtonStyled
          onClick={() => chooseTime(requestedTime)}
          color="primary"
          disabled={!timeOptionsAsap}
        >
          {orderMsg}
        </ButtonStyled>
      </RequestedAtDateTimeAsap>
      {/* {firstTime.has_asap ? (
        <>
          <RequestedAtDateTimeAsap>
            <ButtonStyled
              onClick={() => chooseTime('asap')}
              color={isReorder || isLanding ? 'primary' : 'secondary'}
            >
              Order ASAP
              {serviceType !== 'WALKIN' ? ` (about ${asapTime})` : null}
            </ButtonStyled>
          </RequestedAtDateTimeAsap>
        </>
      ) : null} */}
      <RequestedAtDateTimeNevermind>
        <ButtonLink onClick={cancel}>
          {isLocation
            ? "Nevermind, let's choose a different location"
            : isReorder
            ? "Nevermind, I don't want to order this again"
            : 'Nevermind, keep current time'}
        </ButtonLink>
      </RequestedAtDateTimeNevermind>
    </RequestedAtDateTimeView>
  )
}

RequestedAtDateTime.displayName = 'RequestedAtDateTime'
RequestedAtDateTime.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  orderType: propTypes.string,
  requestedAt: propTypes.string,
  chooseTime: propTypes.func,
  cancel: propTypes.func,
  isLocation: propTypes.bool,
  isReorder: propTypes.bool,
  isLanding: propTypes.bool,
}

export default RequestedAtDateTime
