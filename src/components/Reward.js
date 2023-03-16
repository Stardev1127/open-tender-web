import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { BgImage, Body, Box, Heading } from '@open-tender/components'
import { makeLocalDateStr, formatDateStr } from '@open-tender/js'
import { openModal } from '../slices'
import { Grid, ShoppingBag, Star, Truck } from './icons'
import { Tag } from '.'

const RewardButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  text-align: left;
`

const RewardView = styled(Box)`
  position: relative;
  overflow: hidden;
  height: 100%;
`

const RewardTag = styled('div')`
  position: absolute;
  top: -0.9rem;
  right: 1rem;

  & > span {
    padding: 0.3rem 1rem 0.4rem;
  }
`

const RewardImage = styled(BgImage)`
  width: 100%;
  padding: 37.5% 0;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 33.33333% 0;
  }
`

const RewardContent = styled.div`
  padding: ${(props) =>
    props.theme.cards.default.bgColor === 'transparent'
      ? '1.1rem 0 0'
      : '1.3rem 1.3rem 1.2rem'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) =>
      props.theme.cards.default.bgColor === 'transparent'
        ? '0.8rem 0 0'
        : '1rem 1rem 0.8rem'};
  }
`

const RewardTitle = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.main};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

// const RewardDescription = styled(Body)`
//   margin: 0.8rem 0 0;
//   font-size: ${(props) => props.theme.fonts.sizes.small};
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     margin: 0.5rem 0 0;
//     font-size: ${(props) => props.theme.fonts.sizes.xSmall};
//   }
// `

const RewardNote = styled(Body)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.8rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  span {
    display: block;
    line-height: 1.4;
  }
`

const RewardNoteIcon = styled.span`
  width: 1.4rem;
  height: 1.4rem;
  margin: -0.2rem 0.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.4rem 0 0;
  }
`

const makeImageUrl = (images) => {
  const imagesMap = images
    .filter((i) => i.url)
    .reduce((obj, i) => ({ ...obj, [i.type]: i.url }), {})
  return imagesMap.SMALL_IMAGE || imagesMap.APP_IMAGE || imagesMap.LARGE_IMAGE
}

const makeServiceType = (serviceType) => {
  switch (serviceType) {
    case 'WALKIN':
      return (
        <>
          <RewardNoteIcon>
            <Grid />
          </RewardNoteIcon>
          In-store only
        </>
      )
    case 'PICKUP':
      return (
        <>
          <RewardNoteIcon>
            <ShoppingBag />
          </RewardNoteIcon>
          Pickup only
        </>
      )
    case 'DELIVERY':
      return (
        <>
          <RewardNoteIcon>
            <Truck />
          </RewardNoteIcon>
          Delivery only
        </>
      )
    default:
      return null
  }
}

const makeOrderType = (orderType) => {
  switch (orderType) {
    case 'OLO':
      return null
    case 'CATERING':
      return 'Catering only'
    case 'MERCH':
      return 'Merch only'
    default:
      return null
  }
}

const RewardChannel = styled.span`
  color: ${(props) => props.theme.colors.alert};
`

const RewardDash = styled.span`
  margin: 0 0.2rem;
`

const makeChannelType = (channelType) => {
  switch (channelType) {
    case 'APP':
      return <RewardChannel>App Only!</RewardChannel>
    case 'ONLINE':
      return <RewardChannel>Online Only!</RewardChannel>
    case 'POS':
      return <RewardChannel>At POS Only!</RewardChannel>
    case 'KIOSK':
      return <RewardChannel>Kiosk Only!</RewardChannel>
    default:
      return null
  }
}

export const makeLimitations = (item) => {
  const { channel_type, order_type, service_type } = item
  const serviceType = makeServiceType(service_type)
  const orderType = makeOrderType(order_type)
  const channelType = makeChannelType(channel_type)
  const comma = serviceType && orderType ? ', ' : null
  const dash =
    (serviceType || orderType) && channelType ? (
      <RewardDash>-</RewardDash>
    ) : null
  if (serviceType || orderType || channelType) {
    return (
      <>
        {serviceType}
        {comma}
        {orderType}
        {dash}
        {channelType}
      </>
    )
  }
  return (
    <>
      <RewardNoteIcon>
        <Star />
      </RewardNoteIcon>
      Valid on all orders
    </>
  )
}

const makeReward = (item) => {
  const imageUrl = makeImageUrl(item.images)
  const expiration = formatDateStr(item.end_date, 'MMM d')
  const limitations = makeLimitations(item)
  return { ...item, imageUrl, expiration, limitations }
}

const Reward = ({ item }) => {
  const dispatch = useDispatch()
  const today = makeLocalDateStr(new Date(), 0, 'yyyy-MM-dd')
  const reward = makeReward(item)
  const todayOnly = reward.end_date === today
  const bgStyle = reward.imageUrl
    ? { backgroundImage: `url(${reward.imageUrl}` }
    : null

  const redeem = () => {
    const rewardForModal = { ...reward }
    delete rewardForModal.limitations
    const args = { reward: rewardForModal }
    dispatch(openModal({ type: 'reward', args }))
  }

  const expiration = reward.end_date ? (
    reward.end_date === today ? (
      <span>, today only</span>
    ) : reward.end_date ? (
      <span>, use by {reward.expiration}</span>
    ) : null
  ) : null

  return (
    <RewardButton onClick={redeem} label={`Apply ${reward.name}`}>
      <RewardView>
        <RewardTag>
          {todayOnly && <Tag text="Today only!" icon={null} color="alert" />}
        </RewardTag>
        <RewardImage style={bgStyle} />
        <RewardContent>
          <RewardTitle as="p" className="title">
            {reward.title}
          </RewardTitle>
          {/* {reward.short_description && (
            <RewardDescription as="p">
              {reward.short_description}
            </RewardDescription>
          )} */}
          <RewardNote as="div">
            {reward.limitations}
            {expiration}
          </RewardNote>
        </RewardContent>
      </RewardView>
    </RewardButton>
  )
}

Reward.displayName = 'Reward'
Reward.propTypes = {
  item: propTypes.object,
}

export default Reward
