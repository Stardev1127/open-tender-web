import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { Box, ButtonStyled, Heading } from '@open-tender/components'
import { closeModal } from '../../slices'
import { Award } from '../icons'
import { ModalContent, ModalView } from '..'
import Tag from '../Tag'

const TierDiscount = styled(Box)`
  position: relative;
  padding: 1rem 1.5rem;
  margin: 0 0 2rem;

  & > p {
    margin: 0 !important;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  & > p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const TierTagView = styled('div')`
  position: absolute;
  top: -1.1rem;
  right: 1.5rem;
`

const TierDescription = styled('div')`
  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    margin: 0.5em 0;
  }
`

const LoyaltyTier = ({ tier }) => {
  const dispatch = useDispatch()
  const threshold = tier.points
    ? `${tier.value} ${tier.points.name}`
    : tier.value
  const paragraphs = tier.description
    ? tier.description.split('\n').filter((i) => i)
    : null

  return (
    <ModalView style={{ width: '60rem' }}>
      <ModalContent
        title={
          <span>
            <span style={{ color: `${tier.color}` }}>{tier.name} Tier</span>
          </span>
        }
        subtitle={<p>Threshold: {threshold}</p>}
        footer={
          <div>
            <ButtonStyled onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        }
      >
        <>
          {tier.discount ? (
            <TierDiscount>
              <TierTagView>
                <Tag icon={<Award />} text="Reward" />
              </TierTagView>
              <Heading as="p">{tier.discount.title}</Heading>
              <p>{tier.discount.description}</p>
            </TierDiscount>
          ) : null}
          {paragraphs && (
            <TierDescription>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </TierDescription>
          )}
        </>
      </ModalContent>
    </ModalView>
  )
}

LoyaltyTier.displayName = 'LoyaltyTier'
LoyaltyTier.propTypes = {
  tier: propTypes.object,
}

export default LoyaltyTier
