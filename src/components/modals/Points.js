import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectCustomerPointsProgram } from '@open-tender/redux'
import styled from '@emotion/styled'
import { ButtonStyled, Heading } from '@open-tender/components'

import { closeModal } from '../../slices'
import { ModalContent, ModalView, PointsBalance } from '..'

const PointsView = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0;
  text-align: center;
`

const PointsHeader = styled('div')`
  & > p {
    margin: 0;
  }

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    margin: 0;
  }

  p + p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    margin: 1rem 0 0;
  }
`

const PointsContent = styled('div')`
  margin: 1.5rem 0 3rem;

  & > div {
    margin: 1rem auto 2.5rem;
  }

  & > div + p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
  }
`

const Points = () => {
  const dispatch = useDispatch()
  const order = useSelector(selectOrder)
  const program = useSelector(selectCustomerPointsProgram(order.orderType))
  const { name, description, points } = program || {}

  useEffect(() => {
    if (!program) dispatch(closeModal())
  }, [program, dispatch])

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent>
        <PointsView>
          <PointsHeader>
            <Heading as="p">{name}</Heading>
            {description && <p>{description}</p>}
          </PointsHeader>
          <PointsContent>
            <div>
              <PointsBalance {...points} />
            </div>
            <p>{points.name} can be applied to eligible items at checkout.</p>
          </PointsContent>
          <div>
            <ButtonStyled onClick={() => dispatch(closeModal())}>
              Close
            </ButtonStyled>
          </div>
        </PointsView>
      </ModalContent>
    </ModalView>
  )
}

Points.displayName = 'Points'

export default Points
