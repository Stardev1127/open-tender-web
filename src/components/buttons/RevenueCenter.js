import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectOrder, selectAutoSelect } from '@open-tender/redux'
import { MapPin } from '../icons'
import { ButtonBoth } from '.'

const RevenueCenter = ({ style = null, useButton = false }) => {
  const navigate = useNavigate()
  const { revenueCenter } = useSelector(selectOrder)
  const autoSelect = useSelector(selectAutoSelect)

  const change = () => {
    navigate(`/locations`)
  }

  if (!revenueCenter || autoSelect) return null

  return (
    <ButtonBoth
      text={revenueCenter.name}
      icon={<MapPin />}
      onClick={change}
      style={style}
      useButton={useButton}
    />
  )
}

RevenueCenter.displayName = 'RevenueCenter'
RevenueCenter.propTypes = {
  style: propTypes.object,
  useButton: propTypes.bool,
}

export default RevenueCenter
