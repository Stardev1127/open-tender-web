import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatQuantity } from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { TriangleDown } from './icons'

export const ProgressPointsView = styled.div`
  position: relative;
  width: 100%;
  border-style: solid;
  border-width: 0.05rem;
  border-color: ${(props) => props.theme.border.color};
  background-color: ${(props) => props.theme.bgColors.primary};
  margin: 5.5rem 0 0;
`

export const ProgressPointsFill = styled.div`
  width: 0;
  height: 1.2rem;
  animation: fill-bar 0.5s ease-in-out 0.5s forwards;
  background-color: ${(props) => props.theme.bgColors.highlight};
`

export const ProgressPoint = styled.div`
  position: absolute;
  top: -3rem;
  height: 3rem;
  width: 4rem;
  padding: 0 0 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: ${(props) =>
    props.isFirst ? 'flex-start' : props.isLast ? 'flex-end' : 'center'};
  text-align: ${(props) =>
    props.isFirst ? 'left' : props.isLast ? 'right' : 'center'};
  margin-left: ${(props) =>
    props.isFirst ? '0' : props.isLast ? '-4rem' : '-2rem'};
`

export const ProgressPointText = styled.span`
  display: block;
  width: 100%;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

export const ProgressPointCircle = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 0.4rem;
  border-style: solid;
  border-width: 0.05rem;
  border-color: ${(props) => props.theme.border.color};
  background-color: ${(props) =>
    props.isFilled
      ? props.theme.bgColors.highlight
      : props.theme.bgColors.primary};
`

export const ProgressPointPoints = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  background-color: ${(props) => props.theme.bgColors.primary};
`

export const ProgressPointFootnote = styled.div`
  margin: 1rem 0 0;
  text-align: left;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const ProgressPoints = ({ name, points, thresholds = [] }) => {
  const maxThreshold = Math.max(...thresholds.map((i) => i.points))
  const total = maxThreshold * 1.1
  const progress = Math.min((points / total) * 100, 100)
  const style = { width: `${progress || 0}%` }
  const isOverMax = points > maxThreshold
  let withZero = [{ points: 0 }, ...thresholds]
  // withZero = isOverMax ? withZero.slice(0, -1) : withZero
  const progressPoints = withZero.reduce((arr, i) => {
    return [
      ...arr,
      {
        ...i,
        percentage: (i.points / total) * 100,
        isFilled: points > i.points,
      },
    ]
  }, [])

  return (
    <>
      <ProgressPointsView>
        <div style={style}>
          <ProgressPointsFill />
        </div>
        {progressPoints.map((i, index) => (
          <ProgressPoint
            key={i.percentage}
            style={{ left: `${i.percentage.toFixed(5)}%` }}
            isFirst={index === 0}
            // isLast={index === thresholds.length}
          >
            <ProgressPointText>{i.points}</ProgressPointText>
            <ProgressPointCircle {...i} />
          </ProgressPoint>
        ))}
        {points > 0 ? (
          <ProgressPoint style={{ left: `${progress}%` }}>
            <ProgressPointPoints>{formatQuantity(points)}</ProgressPointPoints>
            <TriangleDown />
          </ProgressPoint>
        ) : null}
      </ProgressPointsView>
      {isOverMax && (
        <ProgressPointFootnote>
          <p>You're off the charts! Start using those {name.toLowerCase()}!</p>
        </ProgressPointFootnote>
      )}
    </>
  )
}

ProgressPoints.displayName = 'ProgressPoints'
ProgressPoints.propTypes = {
  name: propTypes.string,
  points: propTypes.number,
  thresholds: propTypes.array,
}

export default ProgressPoints
