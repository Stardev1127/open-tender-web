import propTypes from 'prop-types'
import styled from '@emotion/styled'
import Tag from './Tag'
import { AlertCircle, CheckCircle } from './icons'

const OrderTagView = styled('div')`
  position: absolute;
  top: -1.1rem;
  right: 1.5rem;
`

const OrderTag = ({ isUpcoming, status }) => {
  const tag = isUpcoming
    ? {
        text: status === 'IN_PROGRESS' ? 'In Progress' : 'Coming up',
        icon: <AlertCircle />,
        color: 'alert',
      }
    : status === 'REFUNDED'
    ? {
        text: 'Refunded',
        color: 'error',
      }
    : {
        text: 'Completed',
        icon: <CheckCircle />,
        color: 'success',
      }

  if (tag.text === 'Completed') return null

  return (
    <OrderTagView>
      <Tag text={tag.text} icon={tag.icon} color={tag.color} />
    </OrderTagView>
  )
}

OrderTag.displayName = 'OrderTag'
OrderTag.propTypes = {
  isUpcoming: propTypes.bool,
  status: propTypes.string,
}

export default OrderTag
