import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  fmtDate,
  capitalize,
  makeOrderTimes,
  time24ToDateStr,
  timezoneMap,
} from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'

const makeOrderWindow = (orderTime) => {
  if (orderTime.start_time === orderTime.end_time) {
    return `@ ${time24ToDateStr(orderTime.start_time)}`
  } else {
    return `from ${time24ToDateStr(orderTime.start_time)} to ${time24ToDateStr(
      orderTime.end_time
    )}`
  }
}

const OrderTimeView = styled('li')`
  padding: 1rem 0;
  border-color: ${(props) => props.theme.border.color};
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-style: solid;

  &:first-of-type {
    padding-top: 0;
  }

  &:last-of-type {
    border-bottom: 0;
    padding-bottom: 0;
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`

const OrderTime = styled('div')`
  p {
    line-height: ${(props) => props.theme.lineHeight};

    &:first-of-type {
      color: ${(props) => props.theme.fonts.headings.color};
      // font-weight: ${(props) => props.theme.boldWeight};
    }

    &:last-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
      margin: 0.2rem 0 0;
    }
  }

  & + button {
    width: 9rem;
    flex-shrink: 0;
    padding-left: 0;
    padding-right: 0;
  }
`

const RequestedAtTimes = ({
  orderTimes,
  revenueCenter,
  requestedAt,
  setRequestedAt,
}) => {
  const tz = timezoneMap[revenueCenter.timezone]
  const availableTimes = makeOrderTimes(orderTimes, tz)

  const handleRequestedAt = (requestedAt) => {
    setRequestedAt(requestedAt)
  }

  return (
    <ul>
      {availableTimes.map((i) => {
        const { weekday, time } = i.order_by
        const orderBy = `${capitalize(weekday)} at ${time24ToDateStr(time)}`
        const current = requestedAt === i.iso
        return (
          <OrderTimeView key={i.iso}>
            <div>
              <OrderTime>
                <p>
                  {capitalize(i.weekday)}, {fmtDate(i.date, 'MMM d')}{' '}
                  {makeOrderWindow(i)}
                  {/* {current ? '(current)' : ''} */}
                </p>
                <p>Order by {orderBy}</p>
              </OrderTime>
              <ButtonStyled
                onClick={() => handleRequestedAt(i.iso)}
                color={current ? 'primary' : 'secondary'}
                size="small"
              >
                {current ? 'Keep' : 'Select'}
              </ButtonStyled>
            </div>
          </OrderTimeView>
        )
      })}
    </ul>
  )
}

RequestedAtTimes.displayName = 'RequestedAtTimes'
RequestedAtTimes.propTypes = {
  orderTimes: propTypes.array,
  revenueCenter: propTypes.object,
  requestedAt: propTypes.string,
  setRequestedAt: propTypes.func,
}

export default RequestedAtTimes
