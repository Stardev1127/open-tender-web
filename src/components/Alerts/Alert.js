import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { removeMessage } from '@open-tender/redux'
import { X } from '../icons'

const AlertView = styled.li`
  display: block;
  float: right;
  clear: right;
  margin: 1.3rem 0 0;
  line-height: 1;
  padding: 0.8rem 1rem 0.8rem 1.6rem;
  transition: all 500ms ease;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.25);
  border-radius: ${(props) => props.theme.border.radiusSmall};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.alert.color};
  background-color: ${(props) => props.theme.alert.bgColor};

  > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 0.9;

    span,
    button {
      position: relative;
      display: block;
      flex-shrink: 0;
      color: ${(props) => props.theme.alert.color};
    }

    span {
      top: -0.1rem;
    }

    button {
      top: 0.1rem;
      margin-left: 0.8rem;
    }
  }
`

const Alert = ({ message, id }) => {
  const dispatch = useDispatch()

  const handleRemove = (evt) => {
    evt.preventDefault()
    dispatch(removeMessage(id))
    evt.target.blur()
  }

  return (
    <AlertView>
      <span>
        <span>{message}</span>
        <button onClick={handleRemove} aria-label="Remove alert">
          <X size={14} />
        </button>
      </span>
    </AlertView>
  )
}

Alert.displayName = 'Alert'
Alert.propTypes = {
  message: propTypes.string,
  id: propTypes.string,
}

export default Alert
