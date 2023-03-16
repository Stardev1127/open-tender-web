import propTypes from 'prop-types'
import { formatDollars } from '@open-tender/js'
import { TriangleDown } from './icons'
import {
  ProgressPointsView,
  ProgressPointsFill,
  ProgressPoint,
  ProgressPointText,
  ProgressPointCircle,
  ProgressPointPoints,
  ProgressPointFootnote,
} from './ProgressPoints'

const ProgressSpend = ({ spend, threshold, reward }) => {
  const s = parseFloat(spend)
  const t = parseFloat(threshold)
  const r = parseFloat(reward)
  const remaining = t - s
  const progress = Math.min((s / t) * 100, 100)
  const style = { width: `${progress || 0}%` }

  return (
    <>
      <ProgressPointsView style={{ margin: '4rem 0 0' }}>
        <div style={style}>
          <ProgressPointsFill />
        </div>
        <ProgressPoint style={{ left: '100%' }} isLast={true}>
          <ProgressPointText>{formatDollars(t, '', 0)}</ProgressPointText>
          <ProgressPointCircle />
        </ProgressPoint>
        <ProgressPoint style={{ left: `${progress}%` }}>
          <ProgressPointPoints>{formatDollars(s, '', 0)}</ProgressPointPoints>
          <TriangleDown />
        </ProgressPoint>
      </ProgressPointsView>
      <ProgressPointFootnote>
        <p>
          {formatDollars(remaining, '', 0)} away from your next $
          {formatDollars(r, '', 0)} off!
        </p>
      </ProgressPointFootnote>
    </>
  )
}

ProgressSpend.displayName = 'ProgressSpend'
ProgressSpend.propTypes = {
  spend: propTypes.string,
  threshold: propTypes.string,
  reward: propTypes.string,
}

export default ProgressSpend
